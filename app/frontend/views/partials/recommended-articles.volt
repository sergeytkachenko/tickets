<h2>Рекомендуемые статьи</h2>
<div class="bxslider-wrapper">
    <ul class="bxslider" data-slides-phone="1" data-slides-tablet="2" data-slides-desktop="3" data-slide-margin="15">
        {% for a in recommendedArticles %}
        <li>
            <div class="product-item">
                <div class="pi-img-wrapper">
                    <a href="/recommended-article/view/{{ a.id }}">
                        <img src="{{ a.img_src }}" class="img-responsive" alt="">
                    </a>
                </div>
                <h3><a href="/recommended-article/view/{{ a.id }}">{{ a.title }}</a></h3>
            </div>
        </li>
        {% endfor %}
    </ul>
</div>