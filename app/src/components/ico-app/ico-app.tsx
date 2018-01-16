import { Component, State } from '@stencil/core';
import { Config } from '../../services/config';
import { CrowdsaleImplementation } from '../../services/crowdsale';

@Component({
    tag: 'ico-app' ,
    styleUrl : 'ico-app.scss'
})
export class IcoApp {

    @State() crowdsale:string = '';
    @State() totalSupply:string = '';
    @State() cap:string = '';
    @State() rate:string = '';

    componentWillLoad() {
        Promise.all([
            Config.getConfig() ,
            Config.getAbi('ExampleCrowdsale') ,
            Config.getAbi('ExampleToken')
        ]).then( (response:any[]) => {
            this.crowdsale = response[0].crowdsale;
            window['crowdsale'] = CrowdsaleImplementation.init(response[0].crowdsale, response[0].uri, response[1], response[2]);

            this.totalSupply = window['crowdsale'].totalSupply();
            this.cap = window['crowdsale'].cap();
            this.rate = window['crowdsale'].rate;
        });           
    }

    render() {
        return (
            <div class="container">
                
                <div class="row">
                    <div class="col-12">
                        <ico-investment crowdsaleRate={this.rate} crowdsaleAccount={this.crowdsale}></ico-investment>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-sm-12 col-md-10">
                        <ico-search></ico-search>
                    </div>
                </div>

                <hr />

                <div class="row justify-content-center">
                    <div class="col-sm-12 col-md-10">
                    <ico-information tokensTotal={this.cap} tokensInvested={this.totalSupply}></ico-information>
                    </div>
                </div>

            </div>
        );
    }

}