const channelsTemplate = document.querySelector('[channel-container-template]');
const channelsContainer = document.querySelector('[data-channels-container]');
const radioInputs = document.querySelectorAll('input[name="sort"]');
const reverseButton = document.querySelector('#reverse');

main();

function main() {
    fetch('./channels.json')
        .then(res => res.json())
        .then (data => {
            // console.log(data);
            addChannels(data, channelsContainer);
            sortData(data, channelsContainer);
            reverseData(data, channelsContainer);
        });
};

function addChannels(data, element) {
    data.forEach(item => {
        const channel = channelsTemplate.content.cloneNode(true).children[0];

        //assigned selectors to variable
        const logo = channel.querySelector('[data-logo]');
        const link = channel.querySelector('[data-link]');
        const title = channel.querySelector('[data-title]');
        const sub = channel.querySelector('[data-sub]');
        const video = channel.querySelector('[data-video]');
        const views = channel.querySelector('[data-views]');

        //filling variables
        logo.setAttribute('src', item.thumbnails.medium.url);
        link.setAttribute('href', item.customUrl);
        link.setAttribute('target', '_blank');
        title.textContent = item.title;
        sub.textContent = removeSign(item.statistics.subscriberCount).toLocaleString('en');
        video.textContent = removeSign(item.statistics.videoCount).toLocaleString('en');
        views.textContent = removeSign(item.statistics.viewCount).toLocaleString('en');

        element.append(channel);
    });
};

function sortData(data, element) {
    radioInputs.forEach(radioInput => {
        radioInput.addEventListener('change', () => {
        let selected = document.querySelector('input[name="sort"]:checked').value;
    
            switch (selected) {
                case 'title':
                    data.sort(function(a,b){
                        if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                        if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                        return 0;
                    });
                    break;

                    case 'subscribers':
                    data.sort(function(a,b){
                        if(removeSign(a.statistics.subscriberCount) < removeSign(b.statistics.subscriberCount)) return -1;
                        if(removeSign(a.statistics.subscriberCount) > removeSign(b.statistics.subscriberCount)) return 1;
                        return 0;
                    });
                    break;

                case 'videos':
                    data.sort(function(a,b){
                        if(removeSign(a.statistics.videoCount) < removeSign(b.statistics.videoCount)) return -1;
                        if(removeSign(a.statistics.videoCount) > removeSign(b.statistics.videoCount)) return 1;
                        return 0;
                    });
                    break;

                case 'views':
                    data.sort(function(a,b){
                        if(removeSign(a.statistics.viewCount) < removeSign(b.statistics.viewCount)) return -1;
                        if(removeSign(a.statistics.viewCount) > removeSign(b.statistics.viewCount)) return 1;
                        return 0;
                    });
                    break;
            }
                element.innerHTML = '';
                addChannels(data, element);
        });
    });
};

function removeSign(value) {
    const replaceSign = value.replace(/\s /g,'').replace(/,/g,'').replace(/ /g,'').replace(/\./g,'');
    return Number(replaceSign);
};

function reverseData(data, element) {
    reverseButton.addEventListener('click', () => {
        data = data.reverse();
        element.innerHTML = '';
        addChannels(data, element);
    });
};