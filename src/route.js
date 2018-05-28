function route(handle, pathname,response,request,debug) {
  console.log("Indo para: " + pathname);
 
   if (typeof handle[pathname] === 'function') {
     return handle[pathname](response,request);
	} else {
	 if(debug == true){
	 console.log("Sem roteamento para: " + pathname);
	 }
     response.writeHead(404, {"Content-Type": "text/plain"});
     response.write("404 Not found");
     response.end();
    }
}

exports.route = route;