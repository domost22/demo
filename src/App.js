import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Header from './components/general/Header'
import Footer from './components/general/Footer'
import Home from './components/pages/Home'
import './css/bootstrap.min.css'
import './css/style.css'
import './css/responsive.css'
import "react-datepicker/dist/react-datepicker.css"
import './css/chat.css'
import Booking from "./components/pages/Booking";
import Register from "./components/pages/Register";
import Success from "./components/pages/Success";
import Logout from "./components/pages/Logout";
import LoginForm from "./components/login/LoginForm";
import ContactUs from "./components/pages/ContactUs";
import Quote from "./components/pages/Quote";
import Faq from "./components/pages/Faq";
import NotFound from "./components/pages/NotFound";
import {LanguageContext, languages} from './context/LanguageContext';
import Cookies from 'universal-cookie';
import ForgotPassword from "./components/pages/ForgotPassword";
import ApiClient from "./network/ApiClient";
import {UserContext} from "./context/UserContext";
import MyReservation from "./components/pages/MyReservation";
import Blog from "./components/pages/Blog";
import BlogSingle from "./components/pages/BlogSingle";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import Redirect from "./components/pages/Redirect";
import Loader from "./components/general/Loader";
import {translations} from "./translation/Translations";
import socketIOClient from "socket.io-client";
import SocketIO from "./SocketIO/SocketIO";
import uuid from 'react-uuid';
import {Widget, addUserMessage, addResponseMessage} from "react-chat-widget";
import ExcursionsSingle from "./components/excursion/ExcursionSingle";
import ScrollToTop from "./ScrollToTop";
import Modal from "./components/general/Modal";
import Failure from "./components/pages/Failure";

class App extends React.Component {
    chatClick= null;
    chatEvent= null;

    constructor(props) {
        super(props);
        const cookies = new Cookies();
        this.toggleLanguage = (language) => {
            this.setState({language});
            cookies.set('hl', language, {path: '/'});
        };
        this.setUser = (user) => {
            this.setState({user});
            cookies.set('userId', user ? user.id : '', {path: '/'});
        };
        this.state = {
            language: cookies.get('hl') ? cookies.get('hl') : (('en' === navigator.language.substring(0, 2) || 'hr' === navigator.language.substring(0, 2)) ? navigator.language.substring(0, 2) : languages.en),
            toggleLanguage: this.toggleLanguage,
            setUser: this.setUser,
            locations: [],
            fetchingLocations: false,
            fetchingUser: false,
            fromId: null,
            toId: null,
            user: null,
            excursions: [],
            showHeader: true,
            setLoader: false,
            isChatOpened: false,
            unreadMessages: 0,
            socketOpened: false,
            askToLoadMessages: false,
            canAskToLoadMessages: true,
        };
    }

    async componentDidMount() {
        const chatTriggers = document.getElementsByClassName("rcw-launcher");
        Array.from(chatTriggers).forEach((element) => {
            this.chatEvent = element.addEventListener('click', () => {
                this.setState({unreadMessages: 0});
            });
        });
        const apiClient = new ApiClient();
        const cookies = new Cookies();
        this.cookies = new Cookies();
        const userId = ('string' === typeof cookies.get('userId') && cookies.get('userId') && 'null' !== cookies.get('userId')) ? cookies.get('userId') : null;

        if (!this.state.user && userId) {
            this.setState({fetchingUser: true}, () => {
                apiClient.getUserById(cookies.get('userId')).then(
                    (result) => {
                        this.setState({user: result.data, fetchingUser: false}, () => {
                            let clientId = null;
                            if (this.state.user) {
                                clientId = userId;
                                this.startSocket(clientId);
                            } else {
                                clientId = uuid();
                                cookies.set('clientId', clientId, {path: '/'});
                            }
                        });
                    },
                    (error) => {
                        this.setState({fetchingUser: false});
                    }
                );
            });
        } else {
            let clientId = null;
            if (cookies.get('clientId')) {
                clientId = cookies.get('clientId');
            } else {
                clientId = uuid();
                this.setState({canAskToLoadMessages: false});
                cookies.set('clientId', clientId, {path: '/'});
            }
            this.startSocket(clientId);
        }

        const chatWrappers = document.getElementsByClassName("rcw-widget-container");
        for (let i = 0; i < chatWrappers.length; i++) {
            this.chatClick = chatWrappers[i].addEventListener('click', () => {this.checkToLoadMessages()}, false);
        }
    }

    componentWillUnmount(): void {
        if (this.chatClick) {
            this.chatClick = null;
        }
        if (this.chatEvent) {
            this.chatEvent = null;
        }
    }

    checkToLoadMessages = () => {
        this.setState({askToLoadMessages: true});
    };

    loadMessages = () => {
        const apiClient = new ApiClient();
        let clientId = this.cookies.get('userId');
        if (!clientId || 'undefined' === clientId || 'null' === clientId) {
            clientId = this.cookies.get('clientId')
        }
        apiClient.getClientMessages(clientId).then(
            (result) => {
                if (result.data) {
                    this.preFillMessages(result.data);
                    this.chatClick = null;
                }
            },
            (error) => {
            }
        );
    };

    getExcursions = () => {
        const apiClient = new ApiClient();
        apiClient.getExcursions().then(
            (result) => {
                this.setState({excursions: result});
            },
            (error) => {
                console.log(error);
            }
        );
    };

    startSocket = (clientId) => {
        setTimeout(() => {
            this.setState({socketOpened: true});
            const socketIO = new SocketIO();
            this.socket = socketIOClient(socketIO.url + '?clientId=' + clientId + '&secret=gnq348g9hah8nae!mhehnaerhnerg&id=' + uuid());
            this.socket.on("chat message", (message) => {
                if (!message.attributes.sentBy) {
                    const chatWrappers = document.getElementsByClassName("rcw-widget-container");
                    Array.from(chatWrappers).forEach((element) => {
                        if (!element.classList.contains('rcw-opened')) {
                            this.setState({unreadMessages: this.state.unreadMessages + 1});
                        }
                    });
                    addResponseMessage(message.attributes.message);
                }
            });
        }, 3000);
    };

    preFillMessages = (messages) => {
        messages.reverse().forEach((message) => {
            if (message.attributes.sentBy) {
                addUserMessage(message.attributes.message);
            } else {
                addResponseMessage(message.attributes.message);
            }
        });
    };


    setFromId = (fromId) => {
        this.setState({fromId});
    };

    setToId = (toId) => {
        this.setState({toId});
    };

    hideHeader = () => {
        this.setState({showHeader: false});
    };

    changeLoader = (status) => {
        this.setState({setLoader: status});
    };

    createChatMessageObject = (chatMessage) => {
        const clientId = this.state.user ? this.state.user.id : this.cookies.get('clientId');
        return {
            type: 'message',
            attributes: {
                message: chatMessage,
                sentBy: clientId,
                clientId: clientId,
                createdAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
            },
            relationships: {
                user: {
                    data: this.state.user ? {
                        type: "user",
                        id: this.state.user.id
                    } : null
                }
            }
        };
    };

    handleNewUserMessage = (chatMessage) => {
        this.socket.emit('chat message', this.createChatMessageObject(chatMessage));
    };

    render() {
        if (this.state.setLoader) {
            return (<Loader/>);
        }

        return (
            <LanguageContext.Provider value={this.state}>
                <UserContext.Provider value={this.state}>
                    <Router>
                        <ScrollToTop>
                            <Route path={'*'} render={(history) => {
                                return (
                                    <div className="layout-theme">
                                        {this.state.showHeader && <Header/>}
                                        <TransitionGroup className="transition-group">
                                            <CSSTransition
                                                key={history.location.key}
                                                timeout={{enter: 200, exit: 100}}
                                                classNames={'fade'}
                                            >
                                                <section className="route-section">
                                                    {this.state.askToLoadMessages && this.state.canAskToLoadMessages &&
                                                    <Modal text={'Počmi novi ili loadaj stari razgovor ?'}
                                                           close={() => {
                                                               this.setState({askToLoadMessages: false, canAskToLoadMessages: false});
                                                               this.chatClick = null;
                                                           }}
                                                            confirm={() => {this.loadMessages(); this.setState({askToLoadMessages: false, canAskToLoadMessages: false});}}
                                                    />}
                                                    <Switch>
                                                        <Route path="/hr/izlet/nacionalni-park-slapovi-krke">
                                                            <ExcursionsSingle
                                                                full={('krka_full.webp')}
                                                                image={translations.en.excursion.img1}
                                                                title={translations.hr.excursion.title1}
                                                                author={translations.hr.excursion.author1}
                                                                date={translations.hr.excursion.date1}
                                                                body_main1={translations.hr.excursion.body_main1}
                                                                main_highlight={translations.hr.excursion.body_highlight}
                                                                body_main_footer={translations.hr.excursion.body_main2}
                                                                index={1}
                                                            />
                                                        </Route>
                                                        <Route path="/hr/izlet/nacionalni-park-plitvicka-jezera">
                                                            <ExcursionsSingle
                                                                full={('plitvice_full.webp')}
                                                                image={translations.en.excursion.img2}
                                                                title={translations.hr.excursion.title2}
                                                                author={translations.hr.excursion.author2}
                                                                date={translations.hr.excursion.date2}
                                                                body_main1={translations.hr.excursion.body_main21}
                                                                main_highlight={translations.hr.excursion.body_highlight2}
                                                                body_main_footer={translations.hr.excursion.body_main22}
                                                                index={2}
                                                            />
                                                        </Route>
                                                        <Route
                                                            path="/hr/izlet/split-i-trogir-privatni-izlet">
                                                            <ExcursionsSingle
                                                                full={('trogir_full.webp')}
                                                                image={translations.en.excursion.img3}
                                                                title={translations.hr.excursion.title3}
                                                                author={translations.hr.excursion.author3}
                                                                date={translations.hr.excursion.date3}
                                                                body_main1={translations.hr.excursion.body_main31}
                                                                main_highlight={translations.hr.excursion.body_highlight3}
                                                                body_main_footer={translations.hr.excursion.body_main23}
                                                                index={3}
                                                            />
                                                        </Route>
                                                        <Route
                                                            path="/en/excursion/national-park-krka-waterfalls">
                                                            <ExcursionsSingle
                                                                full={'krka_full.webp'}
                                                                image={translations.en.excursion.img1}
                                                                title={translations.en.excursion.title1}
                                                                author={translations.en.excursion.author1}
                                                                date={translations.en.excursion.date1}
                                                                body_main1={translations.en.excursion.body_main1}
                                                                main_highlight={translations.en.excursion.body_highlight}
                                                                body_main_footer={translations.en.excursion.body_main2}
                                                                index={1}
                                                            />
                                                        </Route>
                                                        <Route path="/en/excursion/national-park-plitvice-lakes">
                                                            <ExcursionsSingle
                                                                full={('plitvice_full.webp')}
                                                                image={translations.en.excursion.img2}
                                                                title={translations.en.excursion.title2}
                                                                author={translations.en.excursion.author2}
                                                                date={translations.en.excursion.date2}
                                                                body_main1={translations.en.excursion.body_main21}
                                                                main_highlight={translations.en.excursion.body_highlight2}
                                                                body_main_footer={translations.en.excursion.body_main22}
                                                                index={2}
                                                            />
                                                        </Route>
                                                        <Route path="/en/excursion/split-and-trogir-private-tour">
                                                            <ExcursionsSingle
                                                                full={('trogir_full.webp')}
                                                                image={translations.en.excursion.img3}
                                                                title={translations.en.excursion.title3}
                                                                author={translations.en.excursion.author3}
                                                                date={translations.en.excursion.date3}
                                                                body_main1={translations.en.excursion.body_main31}
                                                                main_highlight={translations.en.excursion.body_highlight3}
                                                                body_main_footer={translations.en.excursion.body_main23}
                                                                index={3}
                                                            />
                                                        </Route>
                                                        <Route
                                                            path="/hr/blog/zasto-je-vazno-rezervirati-prijevoz-na-vrijeme">
                                                            <BlogSingle

                                                                title={translations.hr.blogSingle.title1}
                                                                author={translations.hr.blog.author1}
                                                                date={translations.hr.blog.date1}
                                                                body_main1={translations.hr.blogSingle.body_main1}
                                                                main_highlight={translations.hr.blogSingle.body_highlight}
                                                                body_main_footer={translations.hr.blogSingle.body_main2}
                                                                index={5}
                                                            />
                                                        </Route>
                                                        <Route
                                                            path="/hr/blog/prijevoz-gostiju-s-svih-aerodroma-u-hrvatskoj">
                                                            <BlogSingle
                                                                title={translations.hr.blogSingle.title2}
                                                                author={translations.hr.blog.author2}
                                                                date={translations.hr.blog.date2}
                                                                body_main1={translations.hr.blogSingle.body_main21}
                                                                main_highlight={translations.hr.blogSingle.body_highlight2}
                                                                body_main_footer={translations.hr.blogSingle.body_main22}
                                                                index={5}
                                                            />
                                                        </Route>
                                                        <Route
                                                            path="/hr/blog/kako-rezervirati-transfer-sa-aerodroma-u-hrvatskoj">
                                                            <BlogSingle
                                                                title={translations.hr.blogSingle.title3}
                                                                author={translations.hr.blog.author3}
                                                                date={translations.hr.blog.date3}
                                                                body_main1={translations.hr.blogSingle.body_main31}
                                                                main_highlight={translations.hr.blogSingle.body_highlight3}
                                                                body_main_footer={translations.hr.blogSingle.body_main23}
                                                                index={5}
                                                            />
                                                        </Route>
                                                        <Route
                                                            path="/en/blog/why-is-it-important-to-book-airport-transfer-in-croatia-on-time">
                                                            <BlogSingle title={translations.en.blogSingle.title1}
                                                                        author={translations.en.blog.author1}
                                                                        date={translations.en.blog.date1}
                                                                        body_main1={translations.en.blogSingle.body_main1}
                                                                        main_highlight={translations.en.blogSingle.body_highlight}
                                                                        body_main_footer={translations.en.blogSingle.body_main2}
                                                                        index={1}
                                                            />
                                                        </Route>
                                                        <Route
                                                            path="/en/blog/transfers-from-and-to-all-airports-in-croatia">
                                                            <BlogSingle
                                                                title={translations.en.blogSingle.title2}
                                                                author={translations.en.blog.author2}
                                                                date={translations.en.blog.date2}
                                                                body_main1={translations.en.blogSingle.body_main21}
                                                                main_highlight={translations.en.blogSingle.body_highlight2}
                                                                body_main_footer={translations.en.blogSingle.body_main22}
                                                                index={2}
                                                            />
                                                        </Route>
                                                        <Route path="/en/blog/how-to-book-a-transfer-in-croatia">
                                                            <BlogSingle
                                                                title={translations.en.blogSingle.title3}
                                                                author={translations.en.blog.author3}
                                                                date={translations.en.blog.date3}
                                                                body_main1={translations.en.blogSingle.body_main31}
                                                                main_highlight={translations.en.blogSingle.body_highlight3}
                                                                body_main_footer={translations.en.blogSingle.body_main23}
                                                                index={3}
                                                            />
                                                        </Route>
                                                        <Route path="/hr/blog">
                                                            <Blog/>
                                                        </Route>
                                                        <Route path="/en/blog">
                                                            <Blog/>
                                                        </Route>
                                                        <Route path="/hr/rezervacije">
                                                            <MyReservation/>
                                                        </Route>
                                                        <Route path="/en/reservations">
                                                            <MyReservation/>
                                                        </Route>
                                                        <Route path="/hr/zaboravljena-lozinka">
                                                            <ForgotPassword/>
                                                        </Route>
                                                        <Route path="/hr/forgot-password">
                                                            <ForgotPassword/>
                                                        </Route>
                                                        <Route path="/hr/cesto-postavljanja-pitanja">
                                                            <Faq/>
                                                        </Route>
                                                        <Route path="/en/faq">
                                                            <Faq/>
                                                        </Route>
                                                        <Route path="/hr/ponuda">
                                                            <Quote/>
                                                        </Route>
                                                        <Route path="/en/quote">
                                                            <Quote/>
                                                        </Route>
                                                        <Route path="/hr/kontaktiraj-nas">
                                                            <ContactUs/>
                                                        </Route>
                                                        <Route path="/en/contact-us">
                                                            <ContactUs/>
                                                        </Route>
                                                        <Route path="/hr/uspjesno">
                                                            <Success/>
                                                        </Route>
                                                        <Route path="/en/success">
                                                            <Success/>
                                                        </Route>
                                                        <Route path="/hr/odjava">
                                                            <Logout/>
                                                        </Route>
                                                        <Route path="/en/logout">
                                                            <Logout/>
                                                        </Route>
                                                        <Route path="/hr/registracija">
                                                            <Register includeTabs={false} setUser={this.setUser}/>
                                                        </Route>
                                                        <Route path="/en/register">
                                                            <Register includeTabs={false} setUser={this.setUser}/>
                                                        </Route>
                                                        <Route path="/en/login">
                                                            <LoginForm includeTabs={false} setUser={this.setUser}/>
                                                        </Route>
                                                        <Route path="/hr/prijava">
                                                            <LoginForm includeTabs={false} setUser={this.setUser}/>
                                                        </Route>
                                                        <Route path="/hr/rezervacija/:from/:to/:date?/:time?">
                                                            <Booking
                                                                locations={this.state.locations}
                                                                fetchingLocations={this.state.fetchingLocations}
                                                                fromId={this.state.fromId}
                                                                toId={this.state.toId}
                                                                setUser={this.setUser}
                                                                changeLoader={this.changeLoader}
                                                            />
                                                        </Route>
                                                        <Route path="/en/failure">
                                                            <Failure/>
                                                        </Route>
                                                        <Route path="/en/booking/:from/:to/:date?/:time?">
                                                            <Booking
                                                                locations={this.state.locations}
                                                                fetchingLocations={this.state.fetchingLocations}
                                                                fromId={this.state.fromId}
                                                                toId={this.state.toId}
                                                                setUser={this.setUser}
                                                                changeLoader={this.changeLoader}
                                                            />
                                                        </Route>
                                                        <Route exact={true} path="/en">
                                                            <Home
                                                                locations={this.state.locations}
                                                                fetchingLocations={this.state.fetchingLocations}
                                                                setFromId={this.setFromId}
                                                                setToId={this.setToId}
                                                                excursions={this.state.excursions}
                                                                getExcursions={this.getExcursions}
                                                            />
                                                        </Route>
                                                        <Route exact={true} path="/hr">
                                                            <Home
                                                                locations={this.state.locations}
                                                                fetchingLocations={this.state.fetchingLocations}
                                                                setFromId={this.setFromId}
                                                                setToId={this.setToId}
                                                                excursions={this.state.excursions}
                                                                getExcursions={this.getExcursions}
                                                            />
                                                        </Route>
                                                        <Route exact={true} path="/">
                                                            <Redirect to={`/${this.state.language}`}/>
                                                        </Route>
                                                        <Route path="*">
                                                            <NotFound hideHeader={this.hideHeader}/>
                                                        </Route>
                                                    </Switch>
                                                </section>
                                            </CSSTransition>
                                        </TransitionGroup>
                                        <Widget
                                            title="Live Chat"
                                            subtitle=""
                                            badge={this.state.unreadMessages}
                                            autofocus={true}
                                            addResponseMessage={"Your message will be replayed shortly"}
                                            handleNewUserMessage={this.handleNewUserMessage}
                                        />
                                        <Footer/>
                                    </div>
                                );
                            }}/>
                        </ScrollToTop>
                    </Router>
                </UserContext.Provider>
            </LanguageContext.Provider>
        );
    }
}

export default App;

