/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2017 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Google Plus (https://plus.google.com) provider.
 */

class GooglePlus {
    constructor(url = document.location.href) {
        this.url = encodeURIComponent(url);
    }
    
    shareWindow() {
        const share_elements = document.querySelectorAll('[data-social=googleplus]');
        
        [...share_elements].forEach((item) => {
            const url = item.dataset.url ? encodeURIComponent(item.dataset.url) : this.url;
            const share_url = 'https://plus.google.com/share?url=' + url;
            
            item.addEventListener('click', function (event) {
                event.preventDefault();
                return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
            });
        });
    }
    
    getCounter() {
        const script = document.createElement('script');
        const callback = ('goodshare_' + Math.random()).replace('.', '');
        const count_elements = document.querySelectorAll('[data-counter=googleplus]');
        const count_url = 'https://query.yahooapis.com/v1/public/yql?q='
            + encodeURIComponent('select * from html where url="https://plusone.google.com/_/+1/fastbutton?url='
                + this.url + '" and xpath="*"') + '&callback=' + callback;
        
        if (count_elements.length > 0) {
            window[callback] = (counter) => {
                [...count_elements].forEach((item) => {
                    if (counter.results[0]) {
                        item.innerHTML = ((counter.results[0]).match(/javascript">window.__SSR = \{c: (\d+).0/) !== null)
                            ? (counter.results[0]).match(/javascript">window.__SSR = \{c: (\d+).0/)[1] / 1
                            : 0;
                    }
                    else {
                        item.innerHTML = 0;
                    }
                });
                
                script.parentNode.removeChild(script);
            };
            
            script.src = count_url;
            document.body.appendChild(script);
        }
    }
}

export const googleplus_share = new GooglePlus().shareWindow();
export const googleplus_counter = new GooglePlus().getCounter();