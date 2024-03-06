import files from "../pages/files.js"
import upload from "../pages/upload.js"

export default ()=>{
    
    const $element = createNodeElement(`<div class="div_l74A906"></div>`)

    const elements = {
        upload : upload()
    }

    const render =( from = '' )=>{

        $element.innerHTML = ''

        if( from == 'files' ) {
            $element.append(files())
        } else {
            $element.append(elements[ from ])
        }
        

    }

    render('upload') 
    addEventListener('_route', e => render(e.detail.from ))

    return $element

}