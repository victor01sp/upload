export default (data = null)=>{

        const api =( uri = '' )=> window.dataApp.api.server + uri

        const $element = createNodeElement(`
            <div class="div_I6l34b8">
                <div class="div_yG6SdWo">
                    <div class="div_1TrPFDe">
                        <h4 id="textPercentage" style="color:green">100%</h4>
                        <span> 1709656400978.mp4 </span>
                    </div>
                    <div class="div_2a3p2fG">
                        <button id="btnCancel" class="button_l1wVjFZ"><i class="fi fi-rr-cross-small"></i></button>
                    </div>
                </div>
            </div>
        `)
    
        const { btnCancel, textPercentage } = createObjectElement( $element.querySelectorAll('[id]'), 'id', true )
    
        const uploadFile = ( data = null ) =>{
            if( data != null ) {
    
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
    
                xhr.open("POST", api(`/upload.php?dir=0&type=0`), true);
                xhr.send(data);
    
                return xhr
        
            }
        }
    
        const upload = uploadFile( data )
    
        btnCancel.addEventListener('click', ()=> {
    
            if( btnCancel.getAttribute('data-remove') ) {
                return $element.remove()
            }
    
            upload.abort(); 
            btnCancel.setAttribute('data-remove', 'on')
            
        })
        
    
        return $element
}