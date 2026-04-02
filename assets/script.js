(function(){
  const path = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.menu a[data-page]').forEach(a => {
    if (a.getAttribute('data-page') === path) a.classList.add('active');
  });

  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open');
    });
  }

  const backTop = document.querySelector('.back-top');
  if (backTop) {
    window.addEventListener('scroll', function(){
      backTop.classList.toggle('show', window.scrollY > 320);
    });
    backTop.addEventListener('click', function(){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const company = (data.get('company') || '').toString().trim();
      const phone = (data.get('phone') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const subject = (data.get('subject') || '网站咨询').toString().trim();
      const message = (data.get('message') || '').toString().trim();
      const body = [
        '来自官网咨询表单的消息：',
        '',
        '姓名：' + name,
        '公司：' + company,
        '电话：' + phone,
        '邮箱：' + email,
        '',
        '需求内容：',
        message
      ].join('
');
      const mailto = 'mailto:sunny@fukuichina.cn?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      window.location.href = mailto;
    });
  }

  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', function(){
      const item = this.closest('.accordion-item');
      const panel = item.querySelector('.accordion-panel');
      const willOpen = this.getAttribute('aria-expanded') !== 'true';

      document.querySelectorAll('.accordion-item').forEach(other => {
        other.classList.remove('is-open');
        const otherTrigger = other.querySelector('.accordion-trigger');
        const otherPanel = other.querySelector('.accordion-panel');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        if (otherPanel) otherPanel.style.display = 'none';
      });

      if (willOpen) {
        item.classList.add('is-open');
        this.setAttribute('aria-expanded', 'true');
        if (panel) panel.style.display = 'block';
      }
    });
  });
})();
