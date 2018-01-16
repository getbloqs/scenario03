import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'ico-information'
})
export class IcoInformation {

    @Prop() tokensTotal:string = "";
    @Prop() tokensInvested:string = "";

    get percent() : string {
        return "" + Math.ceil( (parseFloat(this.tokensInvested) / parseFloat(this.tokensTotal) * 100) );
    }

    get total() : string {
        return "" + Math.ceil(parseFloat(this.tokensTotal));
    }

    get invested() : string {
        return "" + Math.ceil(parseFloat(this.tokensInvested));
    }

    render() {
        return (
            <div>
                <h2>ICO Information</h2>

                <p>There are {this.total} tokens available and {this.invested} were sold. There are around {this.percent}% of all tokens sold.</p>

                <div class="progress">
                    <div class="progress-bar" style={{width: this.percent + '%'}}></div>
                </div>
            </div>
        );
    }

}