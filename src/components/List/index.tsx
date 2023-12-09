import React, { useEffect, useState } from "react";
import "./styles.scss";
import Button from "../Button";
import { NewsItem, sourcingFrom, ApiSource } from "../News";

const NewsItemRow = ({ newsItem }: { newsItem: NewsItem }) => {
  const { author, description, source, title, url, image } = newsItem;

  const apiSource: ApiSource = newsItem.apiSource;
  const publishedAt = new Date(newsItem.publishedAt).toLocaleDateString(
    "en-us",
    {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }
  );

  return (
    <div className="news-list-item-wrapper">
      <div className="news-list-item">
        <div className="left-cont">
          <img src={image} alt={title} width={100} height={100}></img>
        </div>
        <div className="right-cont">
          <div className="main-text-section">
            <h3>{title}</h3>
            <p>{description}</p>
            <article>Sourcing from: {sourcingFrom[apiSource]}</article>
            <article>Main Source: {source}</article>
            <article>Published Date: {publishedAt}</article>
            <article>Author: {author}</article>
          </div>
          <Button behavior="link" href={url} target="_blank">
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
};

const List = ({ newsItems }: { newsItems: NewsItem[] }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastNewsItem = currentPage * itemsPerPage;
  const indexOfFirstNewsItem = indexOfLastNewsItem - itemsPerPage;
  const currentNewsItems = newsItems.slice(
    indexOfFirstNewsItem,
    indexOfLastNewsItem
  );

  const totalPages = Math.ceil(newsItems.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(()=>{ console.log(newsItems)},[newsItems])

  return (
    <section className="news-list-page">
      <div className="news-list-wrapper">
        {currentNewsItems.map((newsItem) => {
          return <NewsItemRow key={newsItem.id} newsItem={newsItem} />;
        })}

        <div className="news-list-pagination-button">
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
};

export default List;
