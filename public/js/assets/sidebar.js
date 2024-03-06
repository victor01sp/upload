export default ()=>{
    const $element = createNodeElement(`
        <div class="div_RXu40i4">
            <div class="div_tc1dPbR">
                <button data-click="upload" class="button_408T2Lw"><i class="fi fi-rr-add-folder"></i></button>
                <button data-click="files" class="button_408T2Lw"><i class="fi fi-rr-folder"></i></button>
            </div>
        </div>
    `)

    $element.addEventListener('click', e => {
        
        const button = e.target.closest('[data-click]')

        if( button ) {

            dispatchEvent(
                new CustomEvent('_route', {
                    detail : {
                        from : button.getAttribute('data-click')
                    }
                })
            )
        }

    })

    return $element
}