function S (selector) {
    if (selector.charAt(0) == '.')
        return document
            .getElementsByClassName(selector.substr(1))[0];
    if (selector.charAt(0) == '#')
        return document
            .getElementById(selector.substr(1));
}

function init () {
    let gallery = S('.gallery');
    let width = window.outerWidth;;
    let itemHeight = (width < 436) ? 0.8 * (width - 80) : 240;
    for(i in projects){
        let project = projects[i];
        gallery.innerHTML += `<div 
            class="item" 
            onclick="showItem(${i})"
            style="background-image: url(images/${project.image}); background-color: ${project.color}; height: ${itemHeight}px;"
        ><div class="overlay"><div class="title" >${project.title}
        </div><div class="sub-title">${project.sub_title}
        </div><div class="description">${project.description}</div></div></div>`;
    }
}

function showItem (index)  {
    if (S('.item-expanded') != undefined) return;

    let targetItem = document.getElementsByClassName('item')[index];
    let overlay = targetItem.getElementsByClassName('overlay')[0];
    let gallery = S('.gallery');
    let project = projects[index];
    let cloneItem = targetItem.cloneNode(true);
    let cloneOverlay = cloneItem.getElementsByClassName('overlay')[0];
    let screenWidth = window.outerWidth;
    let screenHeight = window.innerHeight;
    let width = 900;
    let height = 450;
    let top = (screenHeight - height) / 2;
    let left = (screenWidth - width) / 2;
    let close = document.createElement('img');
    close.className = 'close';
    close.onclick = closeItem;
    close.src = 'images/back.svg';
    
    setTimeout(() => {
        document.body.appendChild(cloneItem);
        document.body.appendChild(close);
        cloneItem.className = 'item-expanded';
        cloneItem.style.left = targetItem.offsetLeft + 'px';
        cloneItem.style.top = (targetItem.offsetTop - window.scrollY) + 'px';
        cloneItem.style.width = targetItem.offsetWidth + 'px';
        overlay.style.left = '100%';
        
        setTimeout(() => {
            cloneItem.style.display = 'block';

            setTimeout(() => {
                gallery.style.opacity = 0;
                cloneItem.style.height = '450px';
                cloneItem.style.left = left + 'px';
                cloneItem.style.top = top + 'px';
                cloneItem.style.width = '600px';
                cloneOverlay.style.width = '300px';
                if (left <= 12) 
                    cloneOverlay.style.height = 
                        (screenHeight - 80 - cloneItem.offsetHeight) + 'px';

            }, 16);
        }, 336);
    }, 16);
}

function closeItem () {
    let item = S('.item-expanded');
    let close = S('.close');
    let gallery = S('.gallery');

    if (item == undefined) return;

    setTimeout(() => {
        item.style.opacity = '0';
        close.style.opacity = '0';
        gallery.style.opacity = '1';
        
        setTimeout(() => {
            item.parentElement.removeChild(item);
            close.parentElement.removeChild(close);
        }, 416);
    }, 16);
}