import { ApiSource } from "../components/News";
import {
  DefaultAPIParas,
  getGuardianNewsAPIData,
  getNYTAPIData,
  getNewsApiData,
} from "./request";

interface DontCallAPIs {
  news_api?: boolean;
  guardian_api?: boolean;
  nyt_api?: boolean;
}

export interface FilterOptions {
  query?: string;
  author?: {
    guardianAuthor: string;
    nYTAuthor: string;
  };
  category?: string;
  from?: string;
  to?: string;
  sources?: {
    news_api?: string[];
    guardian_api?: boolean;
    nyt_api?: boolean;
  };
}

function generateRandomString(length = 22) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charsetLength = charset.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charsetLength);
    result += charset[randomIndex];
  }

  return result;
}

export const getNews = async (
  newAPIParameters: DefaultAPIParas = {},
  guardianNewsParameters: DefaultAPIParas = {},
  nYTAPIParameters: DefaultAPIParas = {},
  dontCallAPIs: DontCallAPIs = {}
) => {
  const newsData: any = [];

  if (!dontCallAPIs?.news_api) {
    const newsAPIData = await getNewsApiData(newAPIParameters);

    //console.log(res)
    for (let item of newsAPIData) {
      const modifiedRes = {
        id: generateRandomString(),
        apiSource: "news_api",
        author: item.author,
        title: item.title,
        url: item.url,
        image: item.urlToImage,
        publishedAt: item.publishedAt,
        source: item.source?.name ?? "",
        description: item.content ?? item.description,
      };

      newsData.push(modifiedRes);
    }
  }

  if (!dontCallAPIs?.guardian_api) {
    const guardianNewsAPIData = await getGuardianNewsAPIData(
      guardianNewsParameters
    );
    //console.log(res)
    for (let item of guardianNewsAPIData) {
      const modifiedRes = {
        id: generateRandomString(),
        apiSource: "guardian_news",
        author: item.tags[0]?.webTitle ?? "Not Determined",
        title: item.webTitle,
        url: item.webUrl,
        image: item.fields.thumbnail,
        publishedAt: item.webPublicationDate,
        source: "The Guardian News",
        description: item.fields.trailText,
      };

      newsData.push(modifiedRes);
    }
  }

  if (!dontCallAPIs?.nyt_api) {
    const nYTAPIData = await getNYTAPIData(nYTAPIParameters);

    //console.log(res)
    for (let item of nYTAPIData) {
      const modifiedRes = {
        id: generateRandomString(),
        apiSource: "nyt_api",
        author: item.byline.original?.replace("By ", "") ?? "Not Determined",
        title: item.headline.main,
        url: item.web_url,
        image: "https://www.nytimes.com/" + item.multimedia[0]?.url ?? null,
        publishedAt: item.pub_date,
        source: "New York Times",
        description: item.abstract,
      };

      newsData.push(modifiedRes);
    }
  }

  return await newsData;
};

export const filter = async (filterOptions: FilterOptions) => {
  const {
    query = null,
    category = "",
    from = null,
    to = null,
    sources = {},
  } = filterOptions;
  const dontCallAPIs: DontCallAPIs = {};

  if (Object.keys(sources).length !== 0) {
    dontCallAPIs["news_api"] =
      sources.news_api && sources?.news_api?.length <= 0;
    dontCallAPIs["guardian_api"] = !sources.guardian_api;
    dontCallAPIs["nyt_api"] = !sources.nyt_api;
  }

  const newAPIParameters = {
    query: query ?? "",
    from: from ?? "",
    to: to ?? "",
    category: category ?? "",
    sources: sources.news_api?.join(", "),
  };
  const guardianNewsParameters = {
    query: query ?? "",
    from: from ?? "",
    to: to ?? "",
    category: category ?? "",
  };

  const nYTAPIParameters = {
    query: query ?? "",
    from: from ?? "",
    to: to ?? "",
    category: category ?? "",
  };

  return getNews(
    newAPIParameters,
    guardianNewsParameters,
    nYTAPIParameters,
    dontCallAPIs
  );
};
