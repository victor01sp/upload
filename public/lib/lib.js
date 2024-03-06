window.dataLib = {}

function createNodeElement( html ) {
    let element         = document.createElement('div')
    element.innerHTML   = html
    element             = element.children[0] || ''

    element.parentElement.removeChild( element )
    return element;
}

function createObjectElement( elements, attribute, remove = false ) {
    
    return Array.from( elements ).reduce(( prev, element) => {

        prev[ element.getAttribute(attribute) ] = element
        if ( remove ) element.removeAttribute(attribute)

        return prev

    }, {})

}

function copyToClipboard(text = '') {

    if( navigator.clipboard ) {
        navigator.clipboard.writeText(text)
    } else {

        if( !window.dataLib.copy ) {
            window.dataLib.copy = document.createElement('textarea')
            window.dataLib.copy.setAttribute('style', 'position: fixed; top: 0; transform: translateY(-100%);')
        }
        
        window.dataLib.copy.value = text;
    
        document.body.append(window.dataLib.copy);
    
        window.dataLib.copy.select();
        window.dataLib.copy.setSelectionRange(0, text.length);
    
        document.execCommand('copy');
    
        window.dataLib.copy.remove()
    } 

}