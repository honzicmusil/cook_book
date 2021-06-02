//@@viewOn:imports
import React from "react";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import {createVisualComponent} from "uu5g04-hooks";

import Book from "book";
import Author from "author";
import BookList from "bookList";
import AuthorList from "authorList";
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: "LibrarySpa",
    //@@viewOff:statics
};

const CLASS_NAMES = {
    welcomeRow: () => Config.Css.css`
    padding: 56px 0 20px;
    max-width: 624px;
    margin: 0 auto;
    text-align: center;

    ${UU5.Utils.ScreenSize.getMinMediaQueries("s", `text-align: left;`)}

    .uu5-bricks-header {
      margin-top: 8px;
    }

    .plus4u5-bricks-user-photo {
      margin: 0 auto;
    }
  `,
};

export const LibrarySpa = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    //@@viewOff:defaultProps

    render(props) {
        //@@viewOn:private
        function goToBookList() {
            UU5.Environment.getRouter().setRoute("bookList")
        }

        function goToAuthorList() {
            UU5.Environment.getRouter().setRoute("authorList")
        }

        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:render
        const attrs = UU5.Common.VisualComponent.getAttrs(props);
        return (
            <UU5.Bricks.Page
                {...attrs}
                type="1"
                leftWrapperProps={{style: {backgroundColor: '#fafafa'}}}
                top={
                    <UU5.Bricks.Box colorSchema="blue-rich" className="center">
                        <UU5.Bricks.Lsi lsi={{en: "Ivo's Library", cs: "Ivošova knihovna"}}/>
                    </UU5.Bricks.Box>
                }
                bottom={<UU5.Bricks.Box colorSchema="grey" className="center">Copyright Ivo Milota</UU5.Bricks.Box>}
                left={
                    <UU5.Bricks.Div>
                        <UU5.Bricks.Box colorSchema='green' content='Menu'/>
                        <UU5.Bricks.LanguageSelector displayedLanguages={["cs", "en", "uk"]}/>
                        <div className="uu5-common-padding-s">
                            <div>
                                <UU5.Bricks.Button
                                    bgStyle={"transparent"}
                                    onClick={goToBookList}
                                >
                                    <UU5.Bricks.Icon icon="mdi-library-books"/>
                                    <UU5.Bricks.Lsi lsi={{en: "Books", cs: "Knihy", uk: "Yкраїнський"}}/>
                                </UU5.Bricks.Button>

                            </div>
                            <div>
                                <UU5.Bricks.Button
                                    bgStyle={"transparent"}
                                    onClick={goToAuthorList}
                                >
                                    <UU5.Bricks.Icon icon="mdi-library"/>
                                    <UU5.Bricks.Lsi lsi={{en: "Authors", cs: "Autoři"}}/>
                                </UU5.Bricks.Button>
                            </div>
                        </div>
                    </UU5.Bricks.Div>
                }
                leftWidth="xs-25 s-20 m-15 l-15 xl-15"
                leftFixed={true}
                topFixed={"smart"}
                leftSwipe={true}
            >
                <UU5.Common.Router
                    basePath={""}
                    routes={{
                        "": {component: <div>home</div>},
                        "bookList": {component: <BookList/>},
                        "authorList": {component: <AuthorList/>},
                        "book": {component: <Book/>},
                        "author": {component: <Author/>},
                    }}/>
            </UU5.Bricks.Page>
        );
        //@@viewOff:render
    },
})
;

export default LibrarySpa;
