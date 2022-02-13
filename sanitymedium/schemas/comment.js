export default {
    name: 'comment',
    title: 'document',
    type: 'Comment',
    fields: [
      {
        name: 'name',
        type: 'string',
      },
      {
        title: 'Approved',
        name: 'approved',
        type: 'boolean',
        description: "comments won't show on the site without approval"
      },
      {
        name: 'email',
        type: 'string',
      },
      {
        name: 'comment',
        type: 'text',
      },
      {
          name: "post",
          type: 'reference',
          to: [{ type: "post"}],
      }
    ],
}
  