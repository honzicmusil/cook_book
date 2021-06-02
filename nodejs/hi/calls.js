/**
 * Server calls of application client.
 */
import { Client } from "uu_appg01";

const call = async (method, uri, dtoIn) => {
    let response = await Client[method](uri, dtoIn, {});
    return response.data;
};

let Calls = {
    /** URL containing app base, e.g. "https://uuos9.plus4u.net/vnd-app/awid/". */

    createBook(dtoIn) {
        let commandUri = Calls.getCommandUri("book/create");
        return call("post", commandUri, dtoIn.data);
    },

    getBook(dtoIn) {
        let commandUri = Calls.getCommandUri("book/get");
        return call("get", commandUri, dtoIn.data);
    },

    updateBook(dtoIn) {
        let commandUri = Calls.getCommandUri("book/update");
        return call("post", commandUri, dtoIn.data);
    },

    deleteBook(dtoIn) {
        let commandUri = Calls.getCommandUri("book/delete");
        return call("post", commandUri, dtoIn.data);
    },

    listBooks(dtoIn) {
        let commandUri = Calls.getCommandUri("book/list");
        return call("get", commandUri, dtoIn.data);
    },

    bookImageCreate(dtoIn) {
        let commandUri = Calls.getCommandUri("bookImage/create");
        return call("post", commandUri, dtoIn.data, { contentType: "multipart/form-data"});
    },


    createAuthor(dtoIn) {
        let commandUri = Calls.getCommandUri("author/create");
        return call("post", commandUri, dtoIn.data);
    },

    getAuthor(dtoIn) {
        let commandUri = Calls.getCommandUri("author/get");
        return call("get", commandUri, dtoIn.data);
    },

    updateAuthor(dtoIn) {
        let commandUri = Calls.getCommandUri("author/update");
        return call("post", commandUri, dtoIn.data);
    },

    approveAuthor(dtoIn) {
        let commandUri = Calls.getCommandUri("author/approve");
        return call("post", commandUri, dtoIn.data);
    },

    deleteAuthor(dtoIn) {
        let commandUri = Calls.getCommandUri("author/delete");
        return call("post", commandUri, dtoIn.data);
    },

    listAuthors(dtoIn) {
        let commandUri = Calls.getCommandUri("author/list");
        return call("get", commandUri, dtoIn.data);
    },

    /*
    For calling command on specific server, in case of developing client site with already deployed
    server in uuCloud etc. You can specify url of this application (or part of url) in development
    configuration in *-client/env/development.json, for example:
     {
       ...
       "uu5Environment": {
         "gatewayUri": "https://uuos9.plus4u.net",
         "tid": "84723877990072695",
         "awid": "b9164294f78e4cd51590010882445ae5",
         "vendor": "uu",
         "app": "demoappg01",
         "subApp": "main"
       }
     }
     */
    getCommandUri(aUseCase, uri = "http://localhost:3000") {
        // useCase <=> e.g. "getSomething" or "sys/getSomething"
        // add useCase to the application base URI
        if (uri.charAt(uri.length - 1) !== "/") uri += "/";
        return uri + aUseCase.replace(/^\/+/, "");
    },
};

export default Calls;
