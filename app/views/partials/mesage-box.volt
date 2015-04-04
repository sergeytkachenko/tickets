{% if page.items|length > 0 %}
    <table class="table table-striped table-advance table-hover">
        <thead>
        <tr>
            <th colspan="3">

            </th>
            <th class="pagination-control" colspan="3">
                {% if page.before != page.next %}
                    <span class="pagination-info">
                            {{ page.current }} из {{ page.total_pages }}
                        </span>
                    <a class="btn btn-sm blue" href="?page={{ page.before }}">
                        <i class="fa fa-angle-left"></i>
                    </a>
                    <a class="btn btn-sm blue" href="?page={{ page.next }}">
                        <i class="fa fa-angle-right"></i>
                    </a>
                {% endif %}
            </th>
        </tr>
        </thead>
        <tbody>
        {% for message in page.items %}
            <tr data-messageid="{{ message.id }}" class="{% if message.is_unread == 1 %}unread{% endif %}" onclick="location.href='/message/read/{{ message.id }}'">
                <td class="inbox-small-cells">
                    <i class="fa  {% if message.is_unread == 1 %} fa-spinner {% else %} fa-check {% endif %}"></i>
                </td>
                <td class="view-message hidden-xs">
                    {{ message.UsersRecipient.email }}
                </td>
                <td class="view-message view-message">
                    {{ message.subject }}
                </td>
                <td class="view-message inbox-small-cells">
                    <a href="/message/delete/{{ message.id }}"> <i class="fa fa-trash-o"></i></a>
                </td>
                <td class="view-message text-right">
                    {{ message.date }}
                </td>
            </tr>
        {% endfor %}
        </tbody>
    </table>
{% else %}
    <p class="bg-warning" style="padding: 20px">
        <strong>У вас нет сообщений в данной категории</strong>
    </p>
{% endif %}