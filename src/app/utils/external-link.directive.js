export default function () {
  function link(scope, el, attrs) {
    const url = attrs.leavePage;
    const tmpl = `
      <a href="${url}"
        target="_blank"
        title="View page on GitHub"
        class="text-decoration-none relative">
        <i
          class="material-icons absolute top-0"
          style="font-size: 18px; right: -1.5rem;">
          open_in_new
        </i>
      </a>`;
    el.append(tmpl);
  }

  return {
    restrict: 'A',
    link
  };
}
