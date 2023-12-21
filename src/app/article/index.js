import { memo, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import TopHead from "../../containers/top-head";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import shallowequal from "shallowequal";
import articleActions from "../../store-redux/article/actions";
import commentsActions from "../../store-redux/comments/actions";
import Comments from "../../components/comments";
import CommentList from "../../components/comment-list";
import CommentForm from "../../components/comment-form";
import useSelector from "../../hooks/use-selector";
import Comment from "../../components/comment";

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();
  const [activeId, setActiveId] = useState(params.id);

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const sesion = useSelector((state) => ({
    exists: state.session.exists,
  }));

  const select = useSelectorRedux(
    (state) => ({
      article: state.article.data,
      articleWaiting: state.article.waiting,
      comments: state.comments.list,
      count: state.comments.count,
      commentsWaiting: state.comments.waiting,
    }),
    shallowequal
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    replyToComment: (_id) => () => setActiveId(_id),
    onSubmit: (data) => dispatch(commentsActions.add(data)),
    onCancel: () => setActiveId(params.id),
  };

  const renders = {
    itemComment: useCallback(
      (item) => (
        <>
          <Comment
            comment={item}
            replyToComment={callbacks.replyToComment}
            t={t}
          />
          {activeId === item._id && (
            <CommentForm
              articleId={params.id}
              activeId={activeId}
              replyToComment={callbacks.replyToComment}
              submitForm={callbacks.onSubmit}
              onCancel={callbacks.onCancel}
              t={t}
              isDisabled={select.commentsWaiting}
              isAuth={sesion.exists}
            />
          )}
        </>
      ),
      [
        activeId,
        params.id,
        callbacks.replyToComment,
        callbacks.onSubmit,
        callbacks.onCancel,
        select.commentsWaiting,
        sesion.exists,
        t,
      ]
    ),

    itemChildren: useCallback(
      (item) => (
        <CommentList
          list={select.comments}
          parentId={item._id}
          renderItem={renders.itemComment}
          renderChildren={renders.itemChildren}
        />
      ),
      [
        select.comments,
        activeId,
        params.id,
        callbacks.replyToComment,
        callbacks.onSubmit,
        callbacks.onCancel,
        select.commentsWaiting,
        sesion.exists,
        t,
      ]
    ),
  };

  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.articleWaiting}>
        <ArticleCard
          article={select.article}
          onAdd={callbacks.addToBasket}
          t={t}
        />
      </Spinner>
      <Spinner active={select.commentsWaiting}>
        <Comments count={select.count} t={t}>
          <CommentList
            list={select.comments}
            parentId={params.id}
            renderItem={renders.itemComment}
            renderChildren={renders.itemChildren}
          />
          {activeId === params.id && (
            <CommentForm
              articleId={params.id}
              activeId={activeId}
              replyToComment={callbacks.replyToComment}
              submitForm={callbacks.onSubmit}
              t={t}
              isDisabled={select.commentsWaiting}
              isAuth={sesion.exists}
            />
          )}
        </Comments>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
