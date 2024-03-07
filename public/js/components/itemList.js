import itemUploadLocal from "./itemUploadLocal.js"
import itemUploadServer from "./itemUploadServer.js"
import itemWaitingServer from "./itemWaitingServer.js"

export default ( data = {} )=>{

    const $element = createNodeElement(`
        <div class="div_I6l34b8">
            <div class="div_yG6SdWo">
                <div class="div_8ke8e9l">

                    ${ data.from == 'loadFile' 
                    ? '<input id="inputFile" type="file" style="height:auto">'
                    : '<input id="inputLink" type="text" placeholder="link">' }
                    
                </div>
                <div class="div_2a3p2fG">
                    <button id="btnRemove" class="button_l1wVjFZ"><i class="fi fi-rr-cross-small"></i></button>
                    <button id="btnset" class="button_l1wVjFZ" style="display:none"><i class="fi fi-rr-check"></i></button>
                </div>
            </div>
        </div>
    `)

    const { btnRemove, btnset, inputLink, inputFile } = createObjectElement( $element.querySelectorAll('[id]'), 'id', true )

    btnRemove.addEventListener('click', ()=> {
        $element.remove()
    })

    if( [ 'addLink', 'setLink' ].includes( data.from ) ) {
        inputLink.addEventListener('input', e => {
            if( e.target.value.trim() === '' ) btnset.setAttribute('style', 'display:none')
            else btnset.setAttribute('style', '')
        })
    } 
    
    else if( data.from == 'loadFile' ) {
        inputFile.addEventListener('input', e => {

            if( inputFile.files[0] ) btnset.setAttribute('style', '')
            else btnset.setAttribute('style', 'display:none') 
    
        })
    }

    btnset.addEventListener('click', ()=> {
        if( data.from == 'addLink' ) {
            $element.replaceWith( itemUploadLocal( inputLink.value.trim() ) )
        }
        else if( data.from == 'setLink' ) {
            $element.replaceWith( itemWaitingServer( inputLink.value.trim(), Date.now() ) )
        }
        else if( data.from == 'loadFile' ) {
            const formData = new FormData()
            formData.append('file', inputFile.files[0]);
            $element.replaceWith( itemUploadServer( formData, inputFile.files[0].name ) )
        }
    })

    
 
    return $element
}