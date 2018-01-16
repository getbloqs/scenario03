import { Crowdsale } from './../api/crowdsale';

declare var Web3;

export class CrowdsaleImplementation {

    protected account:string;
    protected uri:string;    
    protected web3:any;

    protected crowdsale:any;
    protected token:any;
 
    public rate:number;
    public decimals:number;
    
    static init(account:string, uri:string, abiCrowdsale:any, abiToken:any) : Crowdsale {
        let instance = new CrowdsaleImplementation();

        instance.account = account;      
        instance.uri = uri;

        instance.web3 = new Web3(new Web3.providers.HttpProvider(uri));
        instance.crowdsale = instance.web3.eth.contract(abiCrowdsale).at(account);
        instance.token = instance.web3.eth.contract(abiToken).at(instance.crowdsale.token());

        instance.rate = instance.crowdsale.rate().toNumber();
        instance.decimals = instance.token.decimals().toNumber();

        return instance;
    }

    balanceOf(account:string) {
        return this.formatToken(this.token.balanceOf(account).toString(10), this.decimals);
    }

    totalSupply() {
        return this.formatToken(this.token.totalSupply().toString(10), this.decimals);
    }

    cap() {
        return this.formatToken(this.crowdsale.cap().toString(10), this.decimals);
    }

    formatToken(input:string, decimals:number) {
        input = "" + input;
    
        if (input.length > decimals) {
            let fraction = input.slice(-(decimals));
            let full = input.slice(0, input.length - fraction.length);
            
            let shortenFraction = 0;
            for (let i = fraction.length; i >= 0; --i) {
                if (fraction.charAt(i) != '0') {
                    break;
                }
                shortenFraction = i;
            }
    
            let formattedFraction = fraction.substring(0, shortenFraction).trim();
            return full + (formattedFraction.length > 0 ? ('.' + formattedFraction) : '');
        }
    }

}