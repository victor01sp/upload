export default ()=>{

    const api =( uri = '' )=> window.dataApp.api.server + uri

    const $element = createNodeElement(`
        <div class="div_k4wtV44">
            <header class="header_eUnQ3cO">
                <h3>Files</h3>
                <div class="div_F4H60Ye">
                    <button class="button_l1wVjFZ" ><i class="fi fi-rr-search"></i></button>
                </div>
            </header>
            <div id="container" class="div_gPfQM3F">
                <div id="listItem" class="div_fAxj5uI"></div>
            </div>
        </div>
    `)

    const { listItem } = createObjectElement( $element.querySelectorAll('[id]'), 'id', true )

    listItem.addEventListener('click', e => {
        const button = e.target.closest('[data-copy]')
        if( button ) {
            copyToClipboard( button.getAttribute('data-copy') )
        }
    })

    const dataRender =( Data = [] )=>{
 
        listItem.innerHTML = Data.map( data => {

            return `
                <div class="div_I6l34b8">
                    <div class="div_yG6SdWo">
                        <div class="div_8ke8e9l">
                            <span style="padding: 0 20px">${ data }</span>
                        </div>
                        <div class="div_2a3p2fG">
                            <button id="btnRemove" class="button_l1wVjFZ" data-copy="${ api(`/storage/files/${ data }`) }"><i class="fi fi-rr-copy"></i></button>
                            <a href="${ api(`/storage/files/${ data }`) }" class="button_l1wVjFZ" target="_blank"><i class="fi fi-rr-angle-small-right"></i></a>
                        </div>
                    </div>
                </div>
            `

        }).join('')

    }

    const dataLoad =()=>{
        
        fetch( api('/files.php') )
            .then( res => res.json() )
            .then( dataRender )

    }

    dataLoad()

    return $element

}