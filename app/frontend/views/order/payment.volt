{% if success is defined %}
    <div class="row">
        <div class="col-md-6">
            <h3 style="font-size:1.3em; font-weight:600;color:#7ab72a;padding-bottom:3%;margin-top:2%;">Оплата осуществляется сервисом Приватбанка</h3>
            <p style="font-size:1.1em; color:#555555;">Система безопасных электронных платежей LiqPay ПриватБанка позволяет оплачивать любыми картам Visa, MasterCard и Maestro. </p><p style="font-size:1.1em; color:#555555;">Используется современный стандарт безопасности - 3D Secure, для обеспечения максимальной безопасности платежей.</p>
        </div>
        <div class="col-md-3" style="padding-left:8%;">
            <a href="https://www.liqpay.com/"><img src="/img/liqpay.png" alt="LiqPay" style="margin-bottom:8%;"></a>
            {{ html }}
        </div>
    </div>

{% else %}
    <div>
        Сожалеем, но оплата не удалась, попробуйте чуть позже
    </div>
{% endif %}