import styles from '../../styles/index.module.scss';
import {  CSSProperties, useState } from 'react';

import { Article } from '../../components/article/Article';
import { ArticleParamsForm } from '../../components/article-params-form/ArticleParamsForm';
import {
  ArticleStateType,
  defaultArticleState,
} from '../../constants/articleProps';

export const App = () => {
	const [styleArticle, setStyleArticle] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': styleArticle.fontFamilyOption.value,
					'--font-size': styleArticle.fontSizeOption.value,
					'--font-color': styleArticle.fontColor.value,
					'--container-width': styleArticle.contentWidth.value,
					'--bg-color': styleArticle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={setStyleArticle} />
			<Article />
		</main>
	);
};