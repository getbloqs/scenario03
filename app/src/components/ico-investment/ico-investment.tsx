import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'ico-investment' ,
    styleUrl : 'ico-investment.scss'
})
export class IcoInvestment {

    @Prop() crowdsaleAccount:string = "";
    @Prop() crowdsaleRate:string = "";

    render() {
        return (
            <div class="jumbotron">
                <h1 class="display-4">ICO Demonstration App</h1>

                <p class="lead">This app allows you to invest in an ICO demo. You can use Ether on Ethereum Ropsten Testnet to invest and get ERC-20 tokens in return.</p>
                
                <hr class="my-4" />

                <p>Open the investment account inside your Ethereum wallet and exchange Ether for ERC-20 tokens. For each Wei invested <b>{this.crowdsaleRate}</b> token atoms are generated (<b>1 Wei = {this.crowdsaleRate} Token atoms</b>).</p>
                <p class="lead">
                    <div class="alert alert-primary" role="alert">
                        { this.crowdsaleAccount } <a href={'https://ropsten.etherscan.io/address/' + this.crowdsaleAccount }>Link</a>
                    </div>
                </p>
            </div>
        );
    }

}