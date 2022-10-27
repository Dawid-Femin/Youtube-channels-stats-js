const channelsTemplate = document.querySelector('[channel-container-template]');
const channelsContainer = document.querySelector('[data-channels-container]');
const radioInputs = document.querySelectorAll('input[name="sort"]');
const reverseButton = document.querySelector('#reverse');
const searchInput = document.querySelector('.filter__input');
const clearButton = document.querySelector('#clear');
const invertButton = document.querySelector('#invert');

let channelInfo = [];

main();

function main() {
    fetch('./channels.json')
        .then(res => res.json())
        .then (data => {
            addChannels(data, channelsContainer);
            sortData(data, channelsContainer);
            reverseData(data, channelsContainer);
            clearAll();
            invert();
        });
};

function addChannels(data, element) {
    channelInfo = data.map(item => {
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

        return { name: item.title, element: channel };
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

searchInput.addEventListener('input', (e) => {
    const value = e.target.value;
    channelInfo.forEach(item => {
        const isVisible = item.name.includes(value);
        item.element.classList.toggle('hide', !isVisible);
    });
});

function clearAll() {
    clearButton.addEventListener('click', () => {
        radioInputs.forEach(radioInput => {
            radioInput.checked = false;
        });
        // channelsContainer.innerHTML='';
        searchInput.value='';
    });
};

function invert() {
    invertButton.addEventListener('click', () => {
        let css = 'html {-webkit-filter: invert(100%);' +
        '-moz-filter: invert(100%);' + 
        '-o-filter: invert(100%);' + 
        '-ms-filter: invert(100%); }',
        head = document.getElementsByTagName('head')[0],
        style = document.createElement('style')
    
      if (!window.counter) {
        window.counter = 1
      } else {
        window.counter++
        if (window.counter % 2 == 0) {
          css ='html {-webkit-filter: invert(0%); -moz-filter: invert(0%); -o-filter: invert(0%); -ms-filter: invert(0%); }'
        }
      }
    
      style.type = 'text/css'
      if (style.styleSheet) {
        style.styleSheet.cssText = css
      } else {
        style.appendChild(document.createTextNode(css))
      }
      head.appendChild(style)
    });
  };