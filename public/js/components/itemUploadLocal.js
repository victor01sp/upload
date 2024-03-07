import itemUploadServer from "./itemUploadServer.js"

export default ( link )=>{
    const $element = createNodeElement(`
        <div class="div_I6l34b8">
            <div class="div_yG6SdWo">
                <div class="div_1TrPFDe">
                    <p class="text-ellipsis">${ link }</p>
                    <span id="textPercentage" style="color:orange">0%</span>
                </div>
                <div class="div_2a3p2fG">
                    <button id="btnCancel" class="button_l1wVjFZ"><i class="fi fi-rr-cross-small"></i></button>
                </div>
            </div>
        </div>
    `)

    const { btnCancel, textPercentage } = createObjectElement( $element.querySelectorAll('[id]'), 'id', true )

    const uploadFile =( uri )=>{
        const link = uri

        const xhr = new XMLHttpRequest();

        xhr.addEventListener('progress', e => {
            if (e.lengthComputable) {
                const percentage = (e.loaded / e.total) * 100;
                textPercentage.textContent = `${ percentage.toFixed(2) }% ~ subida local`
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                const blob = xhr.response;

                const formData = new FormData();
                formData.append('file', blob, `${ Date.now() }.${ blob.type.split('/')[1] }`);

                $element.replaceWith( itemUploadServer( formData, link ) )

            } else {
                console.error('Error al descargar el video:', xhr.status);
            }
        });

        xhr.responseType = 'blob';
        xhr.open('GET', link, true);
        xhr.send();

        return xhr
    }

    const upload = uploadFile( link )

    btnCancel.addEventListener('click', ()=> {

        if( btnCancel.getAttribute('data-remove') ) {
            return $element.remove()
        }

        upload.abort(); 
        btnCancel.setAttribute('data-remove', 'on')

    })

    return $element
}