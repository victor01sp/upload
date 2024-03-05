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