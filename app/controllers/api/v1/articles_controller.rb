class Api::V1::ArticlesController < ApiController
  skip_before_action :verify_authenticity_token

  def index
    user= current_user
    @article = user.articles
    render json: @article
  end

  def create
    article = Article.new(article_params)
    article.user = current_user
    if article.save
      render json: article
    else
      render json: article.user
    end
  end

  private

  def article_params
    params.require(:article).permit(
    :title,
    :description,
    :url,
    )
  end
end
