import sidebar from "./assets/sidebar.js"
import routes from "./routes/routes.js"

export default ()=>{

    window.dataApp = {
        api : {
            server : 'https://storage.victor01sp.com'
        }
    }

    document.getElementById('root').append(
        sidebar(),
        routes()
    )

}