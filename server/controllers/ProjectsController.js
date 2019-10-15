
exports.index = (req, res, next) => {

    // res.render('index', {
    //     pageTitle: 'Basecamp'
    // });

    res.status(200).json({
        posts: [{ title: 'First posts', content: 'This is first post' }]
    })
}

exports.store = (req, res, next) => {
    
    const title = req.body.title;
    const content = req.body.content;


    res.status(201).json({
        message: 'Product successfully created',
        product: {
            id: 1,
            title: title,
            content: content
        }
    });

}