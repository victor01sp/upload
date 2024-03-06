import itemList from "../components/itemList.js"

export default ()=>{
    
    const $element = createNodeElement(`
        <div class="div_k4wtV44">
            <header class="header_eUnQ3cO">
                <h3>Upload</h3>
                <div class="div_F4H60Ye">
                    <button id="btnAddLink" class="button_l1wVjFZ"><i class="fi fi-rr-sort-alt"></i></button>
                    <button id="btnSetLink" class="button_l1wVjFZ"><i class="fi fi-rr-cloud-download-alt"></i></button>
                    <button id="btnLoadFile" class="button_l1wVjFZ"><i class="fi fi-rr-cloud-upload-alt"></i></button>
                </div>
            </header>
            <div id="container" class="div_gPfQM3F">
                <div id="listItem" class="div_fAxj5uI"></div>
                <div id="listEmpty" class="div_vPf0Cf4"><i class="fi fi-rr-file"></i><span>Lista vacia</span></div>
            </div>
        </div>
    `)

    const { container, listEmpty, listItem, btnAddLink, btnSetLink, btnLoadFile } = createObjectElement( $element.querySelectorAll('[id]'), 'id', true )

    const renderList =( status = false )=>{

        const Element = [
            { element : listEmpty, status : status == false },
            { element : listItem, status : status == true }
        ]

        container.append(
            ...Element.map( element => {

                if( element.status ) {

                    if( element.element.parenElement == container ) return ''
                    return element.element

                }

                element.element.remove()
                return ''
                
            })
        )
    }

    btnAddLink.addEventListener('click', ()=> listItem.append( itemList({ from : 'addLink' }) ))
    btnSetLink.addEventListener('click', ()=> listItem.append( itemList({ from : 'setLink' }) ))
    btnLoadFile.addEventListener('click', ()=> listItem.append( itemList({ from : 'loadFile' }) ))

    const observer = new MutationObserver(( mutationsList, observer )=>{
        for(const mutation of mutationsList) {
            if( mutation.target == listItem ) {
                renderList(listItem.children.length != 0)
            }
        }
    });

    observer.observe( listItem , { attributes: false, childList: true, subtree: false });

    renderList(false)

    return $element

}