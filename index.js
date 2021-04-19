var http = require('http');
var url = require('url');
var fs = require('fs');

var servidor = http.createServer(function (peticion, respuesta) {  //creacion del servidor Los parametros son la peticion del cliente y la respuesta que se dara

    const DireccionUrl = url.parse(peticion.url, true);   // Obtenemos la url completa
    const nombre = DireccionUrl.query.narchivo;           // Obtenemos el nombre del archivo  
    const tipo = DireccionUrl.query.tipo;                 // Obtenemos el tipo de archivo   

    try {
        //Dependiendo el tipo de archivo lo mostraremos
        switch (tipo) {
            case "json":
                var data = fs.readFileSync('./archivos/'+nombre + '.' + tipo); //Leemos el archivo (./archivos) y lo guardamos en data
                respuesta.writeHead(200, { 'Content-Type': 'application/json' }); //Especificamos el tipo de archivo a mostrar
                respuesta.write(data);//mostramos el archivo
                respuesta.end();    //terminamos la conexion
                break;
            case "pdf":
                var data = fs.readFileSync('./archivos/'+nombre + '.' + tipo);
                respuesta.writeHead(200, { 'Content-Type': 'application/pdf' });
                respuesta.write(data);
                respuesta.end();
                break;
    
            case "imagen":
                var data = fs.readFileSync('./archivos/'+nombre + '.png');
                respuesta.writeHead(200, { 'Content-Type': 'image/jpeg' });
                respuesta.write(data);
                respuesta.end();
                break;
    
            default:
                //Mostramos la pagina principal
                var data = fs.readFileSync('index.html');             // Leemos el html principal donde seleccionaremos el archivo
                respuesta.writeHead(200, { 'Content-Type': 'text/html' });
                respuesta.write(data);
                respuesta.end();
                break;
        }
    
    } catch (error) {
        //Culaquier error que ocurra mostramos el archivo error.html
        var data = fs.readFileSync('error.html');
        respuesta.writeHead(404, { 'Content-Type': 'text/html' });
        respuesta.write(data);
        respuesta.end();       
    }
});

servidor.listen(9876, function () {
    console.log('Servidor iniciado');
}); 