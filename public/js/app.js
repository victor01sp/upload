const { listItem, btnAddLink, btnSetLink, btnLoadFile } = createObjectElement( document.querySelectorAll('[id]'), 'id', true )

btnAddLink.addEventListener('click', ()=> {
    //console.log('btn1');
    listItem.append( createItemList() )
})

btnSetLink.addEventListener('click', ()=> {
    listItem.append( createItemList2() )
})

btnLoadFile.addEventListener('click', ()=> {
    listItem.append( createItemList3() )
})

const createItemList = () =>{
    const element = createNodeElement(`
        <div class="item-list">
            <div class="item-flex">
                <div class="div_8ke8e9l">
                    <input id="inputLink" type="text" placeholder="link">
                </div>
                <div class="div_2a3p2fG">
                    <button id="btnRemove" class="button_l1wVjFZ"><i class="fi fi-rr-cross-small"></i></button>
                    <button id="btnset" class="button_l1wVjFZ"><i class="fi fi-rr-check"></i></button>
                </div>
            </div>
        </div>
    `)

    const { btnRemove, btnset, inputLink } = createObjectElement( element.querySelectorAll('[id]'), 'id', true )

    btnRemove.addEventListener('click', ()=> {
        element.remove()
    })

    btnset.addEventListener('click', ()=> {
        element.replaceWith( uploadFileLocal( inputLink.value.trim() ) )
    })
    
    return element
}

const createItemList2 = () =>{
    const element = createNodeElement(`
        <div class="item-list">
            <div class="item-flex">
                <div class="div_8ke8e9l">
                    <input id="inputLink" type="text" placeholder="link">
                </div>
                <div class="div_2a3p2fG">
                    <button id="btnRemove" class="button_l1wVjFZ"><i class="fi fi-rr-cross-small"></i></button>
                    <button id="btnset" class="button_l1wVjFZ"><i class="fi fi-rr-check"></i></button>
                </div>
            </div>
        </div>
    `)

    const { btnRemove, btnset, inputLink } = createObjectElement( element.querySelectorAll('[id]'), 'id', true )

    btnRemove.addEventListener('click', ()=> {
        element.remove()
    })

    btnset.addEventListener('click', ()=> {

        const link = 'https://storage.victor01sp.com/upload.php?dir=0&type=1'

        const formData = new FormData()
        formData.append('link', inputLink.value.trim())

        fetch(link, {
            method : 'POST',
            body   : formData
        })
        .then( res => res.json() )
        .then( res => {
            if( res.status ) {
                element.innerHTML = '<span class="span_ZSfem7Z">~Guardado en el servidor~</span>' 
            } else {
                element.innerHTML = '<span class="span_ZSfem7Z">~Error al guardar en el servidor~</span>' 
            }
        } )
        element.innerHTML = '<span class="span_ZSfem7Z">~Esperando respuesta del servidor~</span>'
    })

    return element
}

const createItemList3 = () =>{
    const element = createNodeElement(`
        <div class="item-list">
            <div class="item-flex">
                <div class="div_8ke8e9l">
                    <input id="inputFile" type="file">
                </div>
                <div class="div_2a3p2fG">
                    <button id="btnRemove" class="button_l1wVjFZ"><i class="fi fi-rr-cross-small"></i></button>
                </div>
            </div>
        </div>
    `)

    const { btnRemove, inputFile } = createObjectElement( element.querySelectorAll('[id]'), 'id', true )

    btnRemove.addEventListener('click', ()=> {
        element.remove()
    })

    inputFile.addEventListener('input', e => {
        const file = e.target.files[0]

        const formData = new FormData()
        formData.append('file', file);

        element.replaceWith( uploadFileServer( formData ) )

    })
 
    return element
}

const uploadFileLocal = ( link = null ) =>{
    
    const element = createNodeElement(`
        <div class="item-list">
            <div class="item-flex">
                <div class="div_1TrPFDe">
                    <h4 id="textPercentage">100%</h4>
                    <span>1709656400978.mp4 </span>
                </div>
                <div class="div_2a3p2fG">
                    <button id="btnCancel" class="button_l1wVjFZ"><i class="fi fi-rr-cross-small"></i></button>
                </div>
            </div>
        </div>
    `)

    const { btnCancel, textPercentage } = createObjectElement( element.querySelectorAll('[id]'), 'id', true )

    const uploadFile =( uri )=>{
        const link = uri

        const xhr = new XMLHttpRequest();

        xhr.addEventListener('progress', e => {
            if (e.lengthComputable) {
                const percentage = (e.loaded / e.total) * 100;
                textPercentage.textContent = `${ percentage.toFixed(2) }%`
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                const blob = xhr.response;

                const formData = new FormData();
                formData.append('file', blob, `${ Date.now() }.${ blob.type.split('/')[1] }`);

                element.replaceWith( uploadFileServer( formData ) )

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
            return element.remove()
        }

        upload.abort(); 
        btnCancel.setAttribute('data-remove', 'on')

    })

    return element

}

const uploadFileServer =( data = null )=>{
    const element = createNodeElement(`
        <div class="item-list">
            <div class="item-flex">
                <div class="div_1TrPFDe">
                    <h4 id="textPercentage">100%</h4>
                    <span>1709656400978.mp4 </span>
                </div>
                <div class="div_2a3p2fG">
                    <button id="btnCancel" class="button_l1wVjFZ"><i class="fi fi-rr-cross-small"></i></button>
                </div>
            </div>
        </div>
    `)

    const { btnCancel, textPercentage } = createObjectElement( element.querySelectorAll('[id]'), 'id', true )

    const uploadFile = ( data = null ) =>{
        if( data != null ) {
    
            const link = 'https://storage.victor01sp.com/upload.php?dir=0&type=0'

            const xhr   = new XMLHttpRequest();
    
            xhr.upload.addEventListener('progress', e => {
                if (e.lengthComputable) {
                    const percentage = (e.loaded / e.total) * 100;
                    textPercentage.textContent = `${ percentage.toFixed(2) }%`
                }
            });

            xhr.addEventListener('load', ()=> {
                console.log(JSON.parse( xhr.responseText ));
            })

            xhr.open("POST", link, true);
            xhr.send(data);

            return xhr
    
        }
    }

    const upload = uploadFile( data )

    btnCancel.addEventListener('click', ()=> {

        if( btnCancel.getAttribute('data-remove') ) {
            return element.remove()
        }

        upload.abort(); 
        btnCancel.setAttribute('data-remove', 'on')
        
    })

    return element
}