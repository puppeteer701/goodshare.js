/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2017 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Viber (https://viber.com) provider.
 */

class Viber {
    constructor(url = document.location.href) {
        this.url = encodeURIComponent(url);
    }
    
    shareWindow() {
        const share_elements = document.querySelectorAll('[data-social=viber]');
        
        [...share_elements].forEach((item) => {
            const url = item.dataset.url ? encodeURIComponent(item.dataset.url) : this.url;
            const share_url = 'viber://forward?text=' + url;
            
            item.addEventListener('click', function (event) {
                event.preventDefault();
                return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
            });
        });
    }
}

export const viber_share = new Viber().shareWindow();