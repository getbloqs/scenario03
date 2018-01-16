import { Component, State } from '@stencil/core';
import { Crowdsale } from '../../api/crowdsale';

declare var crowdsale:Crowdsale;

@Component({
    tag: 'ico-search' ,
    styleUrl : 'ico-search.scss'
})
export class IcoSearch {

    @State() query:string;
    @State() results:boolean = false;
    @State() balance:string = '';

    search() {
        try {
            this.balance = crowdsale.balanceOf(this.query)
            this.results = true;
        } catch(e) {
            this.balance = '';
            this.results = false;
        }
        
    }

    updateQuery(event) {
        this.query = event.target.value.trim();
    }

    close() {
        this.results = false;
    }

    render() {
        let modal = (
            <div>
                <div class="modal fade show" style={{display:(this.results ? 'block' : 'none')}} id="balanceModal" tabindex="-1" role="dialog" aria-labelledby="balanceModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="balanceModalLabel">Your token balance</h5>
                                <button onClick={ () => this.close() } type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                The balance of your account shows <b>{ this.balance }</b> tokens.
                            </div>
                            <div class="modal-footer">
                                <button onClick={ () => this.close() } type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-backdrop fade show"></div>
            </div>
        );

        return (
            <div>
                <h2>Search your investments</h2>

                <p>Enter your ethereum account and find your investments.</p>

                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <button onClick={ () => this.search() } class="btn btn-primary" type="button">Search</button>
                    </div>
                    <input value={this.query} onInput={(e) => this.updateQuery(e)} type="text" class="form-control" placeholder="Ethereum Account..." />
                </div>
                { this.results ? modal : '' }
            </div>            
        );
    }

}