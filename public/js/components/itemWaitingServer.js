export default ( link )=>{

    const api =( uri = '' )=> window.dataApp.api.server + uri

    const $element = createNodeElement(`
        <div class="div_I6l34b8">
            <div class="div_yG6SdWo">
                <div class="div_1TrPFDe">
                    <span id="textMessage" style="padding: 0 20px;">esperando respuesta del servidor</span>
                </div>
                <div class="div_2a3p2fG">
                    <button id="btnCancel" class="button_l1wVjFZ"><i class="fi fi-rr-cross-small"></i></button>
                </div>
            </div>
        </div>
    `)

    const { textMessage, btnCancel } = createObjectElement( $element.querySelectorAll('[id]'), 'id', true )

        const formData = new FormData()
        formData.append('link', link)

        fetch( api(`/upload.php?dir=0&type=1`) , {
            method : 'POST',
            body   : formData
        })
        .then( res => res.json() )
        .then( res => {
            if( res.status ) {
                textMessage.innerHTML = 'Guardado en el servidor' 
                Array.from([ btnCancel ]).forEach( element => element.setAttribute('style', '') )
            } else {
                textMessage.innerHTML = 'Error al guardar en el servidor' 
            }
        } )

    Array.from([ btnCancel ]).forEach( element => element.setAttribute('style', 'display:none') )

    return $element
}