const channelsTemplate = document.querySelector('[channel-container-template]');
const channelsContainer = document.querySelector('[data-channels-container]');

main();

function main() {
    fetch('./channels.json')
        .then(res => res.json())
        .then (data => {
            // console.log(data);
            addChannels(data, channelsContainer);
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
        sub.textContent = item.statistics.subscriberCount;
        video.textContent = item.statistics.videoCount;
        views.textContent = item.statistics.viewCount;

        element.append(channel);
    });
};