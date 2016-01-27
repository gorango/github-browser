export default function () {
  function link(scope, el, attrs) {
    const url = attrs.externalLink;
    const tmpl = `
      <a href="${url}"
        target="_blank"
        title="View page on GitHub"
        class="text-decoration-none absolute right-0 top-0">
        <i
          class="material-icons absolute top-0"
          style="font-size: 18px; right: -1.5rem;">
          open_in_new
        </i>
      </a>`;
    el.addClass('relative');
    el.append(tmpl);
  }

  return {
    restrict: 'A',
    link
  };
}
