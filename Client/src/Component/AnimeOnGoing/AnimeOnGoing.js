import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import MediaQuery from 'react-responsive'
import CardAnime from '../Function/CardAnime'
import ResponsiveAnime from '../Function/ResponsiveAnime'

class AnimeOnGoing extends Component {
    source = axios.CancelToken.source();
    _isMounted = false;

    constructor(props){
        super(props)

        this.state = {
            allData : [],
            currentData : [],
            currentPage: null,
            totalPages: null
        }
    }

    componentDidMount(){
        this._isMounted = true;
        if(this._isMounted){
            axios({
                method : 'GET',
                url : 'http://localhost:5000/ongoing/check_ongoing',
                cancelToken : this.source.token,
            })
            .then(response => {
                this.setState({
                    allData : response.data
                })
            })
            .catch(error => {
                console.log("Terdapat Masalah Dengan Server")
            })
        }
    }

    componentWillUnmount(){
        this.source.cancel();
        this._isMounted = false;
    }

    onPageChanged = data => {
        const { allData } = this.state;
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        const currentData = allData.slice(offset, offset + pageLimit);
    
        this.setState({ currentPage, currentData, totalPages });
    }


    render() {
        const { allData, currentData, currentPage, totalPages } = this.state;
        const totalData = allData.length;

        if (totalData === 0) return null;

        return (
            <React.Fragment>
                {/* PC */}
                <MediaQuery minWidth = {992}>
                    <ResponsiveAnime
                        currentData = {
                            currentData.map((data,index) =>
                                <CardAnime 
                                    key = {index} 
                                    index = {index} 
                                    anime_id = {data.anime_id}
                                    name = {data.List_Of_Anime.name}
                                    studio = {data.List_Of_Anime.studio}
                                    on_going_id = {data.on_going_id} 
                                    image = {data.List_Of_Anime.image} 
                                    image_detail = {data.List_Of_Anime.image_detail} 
                                    rating = {data.List_Of_Anime.rating} 
                                    genre = {data.List_Of_Anime.genre}
                                    gridDesktop = "col-md-4 mt-2 mb-2 px-3"
                                    episode = {data.episode}
                                    id = "more_main_on_going"
                                    id_hover = "more_hover_on_going"
                                    link =  {`/detail_on_going/${data.anime_id}/${data.List_Of_Anime.name}/${data.on_going_id}`}
                                />
                            ) 
                        }
                        currentPage = {currentPage}
                        totalPages = {totalPages}
                        totalData = {totalData}
                        background = {this.props.background}
                        onPageChanged = {this.onPageChanged}
                        title = "OnGoing"
                    />
                </MediaQuery>

                {/* Tablet */}
                <MediaQuery minWidth = {768} maxWidth = {991}>
                    <ResponsiveAnime
                        currentData = {
                            currentData.map((data,index) =>
                            <div className = "col-3 px-0" key = {index}>
                                <CardAnime 
                                    key = {index} 
                                    index = {index} 
                                    anime_id = {data.anime_id}
                                    name = {data.List_Of_Anime.name} 
                                    on_going_id = {data.on_going_id} 
                                    image = {data.List_Of_Anime.image} 
                                    image_detail = {data.List_Of_Anime.image_detail} 
                                    rating = {data.List_Of_Anime.rating} 
                                    genre = {data.List_Of_Anime.genre}
                                    gridTab = "col-12 px-1"
                                    episode = {data.episode}
                                    link =  {`/detail_on_going/${data.anime_id}/${data.List_Of_Anime.name}/${data.on_going_id}`}
                                />
                            </div>) 
                        }
                        currentPage = {currentPage}
                        totalPages = {totalPages}
                        totalData = {totalData}
                        background = {this.props.background}
                        onPageChanged = {this.onPageChanged}
                        title = "OnGoing"
                    />
                </MediaQuery>

                {/* Handphone */}
                <MediaQuery maxWidth = {767}>
                    <ResponsiveAnime
                        currentData = {
                            currentData.map((data,index) =>
                            <div className = "col-6 px-0" key = {index}>
                                <CardAnime 
                                    key = {index} 
                                    index = {index} 
                                    anime_id = {data.anime_id}
                                    name = {data.List_Of_Anime.name} 
                                    on_going_id = {data.on_going_id} 
                                    image = {data.List_Of_Anime.image} 
                                    image_detail = {data.List_Of_Anime.image_detail} 
                                    rating = {data.List_Of_Anime.rating} 
                                    genre = {data.List_Of_Anime.genre}
                                    gridHandphone = "col-12 px-1"
                                    episode = {data.episode}
                                    link =  {`/detail_on_going/${data.anime_id}/${data.List_Of_Anime.name}/${data.on_going_id}`}
                                />
                            </div>) 
                        }
                        currentPage = {currentPage}
                        totalPages = {totalPages}
                        totalData = {totalData}
                        background = {this.props.background}
                        onPageChanged = {this.onPageChanged}
                        title = "OnGoing"
                    />
                </MediaQuery>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        background : state.header.background
    }
}
export default connect (mapStateToProps,null)(AnimeOnGoing)