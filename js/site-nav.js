(function () {
  var script = document.currentScript;
  var scriptSrc = script ? script.getAttribute('src') || '' : '';
  var basePath = '';
  var parentMatches = scriptSrc.match(/(?:\.\.\/)+/);
  if (parentMatches && parentMatches.index === 0) {
    basePath = parentMatches[0];
  }
  var fileName = window.location.pathname.split('/').pop();
  var isHome = fileName === '' || fileName === 'index.html';

  var links = [
    { label: 'Home', href: isHome ? '#home' : basePath + 'index.html#home' },
    { label: 'Blog', href: basePath + 'blog.html' },
    { label: 'Research', href: isHome ? '#research' : basePath + 'index.html#research' },
    { label: 'Project', href: isHome ? '#project' : basePath + 'index.html#project' },
    { label: 'Honor', href: isHome ? '#honor' : basePath + 'index.html#honor' },
    { label: 'Gallery', href: isHome ? '#gallery' : basePath + 'index.html#gallery' }
  ];

  var nav = document.createElement('nav');
  nav.className = 'top-nav';
  nav.setAttribute('aria-label', 'Primary navigation');

  var brand = document.createElement('a');
  brand.className = 'top-nav-brand';
  brand.href = isHome ? '#home' : basePath + 'index.html#home';
  brand.textContent = 'Michael (Chengbo) Yuan';
  nav.appendChild(brand);

  var linkGroup = document.createElement('div');
  linkGroup.className = 'top-nav-links';
  nav.appendChild(linkGroup);

  links.forEach(function (link) {
    var anchor = document.createElement('a');
    anchor.href = link.href;
    anchor.textContent = link.label;
    linkGroup.appendChild(anchor);
  });

  var mount = document.getElementById('site-nav');
  if (mount) {
    mount.replaceWith(nav);
  } else {
    document.body.insertBefore(nav, document.body.firstChild);
  }

  function scrollToHash(hash, updateHistory) {
    if (!hash || hash === '#') {
      return;
    }

    var target = document.getElementById(hash.slice(1));
    if (!target) {
      return;
    }

    var navHeight = nav.getBoundingClientRect().height;
    var targetTop = target.getBoundingClientRect().top + window.pageYOffset;
    var offset = Math.max(navHeight + 18, 70);

    window.scrollTo({
      top: Math.max(targetTop - offset, 0),
      behavior: 'smooth'
    });

    if (updateHistory) {
      window.history.pushState(null, '', hash);
    }
  }

  nav.addEventListener('click', function (event) {
    var link = event.target.closest('a');
    if (!link) {
      return;
    }

    var targetUrl = new URL(link.href, window.location.href);
    var currentUrl = new URL(window.location.href);
    var samePage = targetUrl.pathname === currentUrl.pathname;

    if (samePage && targetUrl.hash) {
      event.preventDefault();
      scrollToHash(targetUrl.hash, true);
    }
  });

  function correctInitialHash() {
    if (window.location.hash) {
      scrollToHash(window.location.hash, false);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', correctInitialHash);
  } else {
    correctInitialHash();
  }
})();
