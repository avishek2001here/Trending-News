import React, { Component } from 'react'
import { NewsItem } from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps={
        country:'in',
        pageSize : 6,
        category:'general',
    }
    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount() {
        this.setState({
            loading:true
        })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults,loading:false });
    }
    handlePrevClick = async() => {
        console.log("Previous")
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles,
            page: this.state.page - 1
        });
    }
    handleNextClick = async() => {
        console.log("Next");
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 18)) {
        }
        else {
            this.setState({
                loading:true
            })
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parseData = await data.json();
            this.setState({
                articles: parseData.articles,
                page: this.state.page + 1,
                loading:false
            });
        }

    }
    render() {
        
        return (
            <div>
                <div className="container my-3 ">
                    <h2 className="text-center">NewsKolkata - Top Trending</h2>
                    {this.state.loading && <Spinner/> }
                    <div className="row">
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title?element.title.slice(0,25):""} description={element.description?element.description.slice(0,45):"This has no such details, you can only see the headings. Details will be posted soon after confirmation."} imageUrl={element.urlToImage?element.urlToImage:"https://images.mktw.net/im-319090/social"} newsUrl={element.url} />
                            </div>
                        })}
                    </div>
                </div>
                <div className="d-flex justify-content-between mx-4 my-4">
                    <button disabled={this.state.page <= 1} className="btn btn-primary" onClick={this.handlePrevClick}>Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 18)} className="btn btn-primary" onClick={this.handleNextClick}>Next</button>
                </div>
            </div>
        )
    }
}

export default News