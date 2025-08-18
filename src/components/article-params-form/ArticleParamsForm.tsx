import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useState, useRef } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

import { useOutsideClickClose } from './hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	onApply: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { onApply } = props;

	const [isOpen, setOpen] = useState<boolean>(false);

	const [styleForm, setStyleForm] =
		useState<ArticleStateType>(defaultArticleState);

	const handleChange = (name: string, selected: OptionType) => {
		setStyleForm({
			...styleForm,
			[name]: selected,
		});
	};

	const outsideAlerterRef = useOutsideClickClose(() => {
		setOpen(false);
	});

	const handleResetClick = () => {
		setStyleForm(defaultArticleState);
		onApply(defaultArticleState);
	};

	const handleSubmit = (evt: React.SyntheticEvent) => {
		evt.preventDefault();
		onApply(styleForm);
		setOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setOpen(!isOpen)} />
			<aside
				ref={outsideAlerterRef}
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text
						children={<h2>Задайте параметры</h2>}
						size={31}
						dynamic={false}
						weight={800}
						fontStyle={'normal'}
						uppercase={true}
						align={'left'}
						family={'open-sans'}
					/>
					<Select
						selected={styleForm.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected: OptionType) => {
							handleChange('fontFamilyOption', selected);
						}}
						title={'шрифт'}
					/>
					<RadioGroup
						name={'fontSize'}
						selected={styleForm.fontSizeOption}
						options={fontSizeOptions}
						onChange={(selected: OptionType) =>
							handleChange('fontSizeOption', selected)
						}
						title={'размер шрифта'}
					/>
					<Select
						selected={styleForm.fontColor}
						options={fontColors}
						onChange={(selected: OptionType) =>
							handleChange('fontColor', selected)
						}
						title={'цвет шрифта'}
					/>
					<Separator />
					<Select
						selected={styleForm.backgroundColor}
						options={backgroundColors}
						onChange={(selected: OptionType) =>
							handleChange('backgroundColor', selected)
						}
						title={'цвет фона'}
					/>
					<Select
						selected={styleForm.contentWidth}
						options={contentWidthArr}
						onChange={(selected: OptionType) =>
							handleChange('contentWidth', selected)
						}
						title={'ширина контента'}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleResetClick}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
