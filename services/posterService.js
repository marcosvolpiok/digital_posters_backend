class posterService {
    constructor(messageRepository) {
        this.messageRepository=messageRepository;
        const posterRepository = require('../repository/posterRepository');
        this.PosterRepository = new posterRepository();
        this.moment = require('moment');
        this.fs = require('fs');
    }

    async add(req, res) {
        const data=req.body;
        data['user'] = res.userData.userId;
        const PosterRepository = this.PosterRepository.add(data);
        // await PosterRepository.save();
        
        return PosterRepository;
    }  
    
    async addImage(req, res) {
        const _this = this;
        const _req= req;

        const destPath=`upload\\posters\\${req.body.id}\\${req.file.originalname}\\${this.moment().format("DD-MM-YY, h-mm-ss")} HS_${req.file.filename}_${req.file.originalname}`;
        if (!this.fs.existsSync(`upload/posters/`)){
            this.fs.mkdirSync(`upload/posters/`);
        }
    
        if (!this.fs.existsSync(`upload/posters/${req.body.id}`)){
            this.fs.mkdirSync(`upload/posters/${req.body.id}`);
        }
    
        if (!this.fs.existsSync(`upload/posters/${req.body.id}/${req.file.originalname}`)){
            this.fs.mkdirSync(`upload/posters/${req.body.id}/${req.file.originalname}`);
        }        
    
        const src = this.fs.createReadStream(req.file.path);
        const dest = this.fs.createWriteStream(destPath);
        src.pipe(dest);
        src.on('end', async function() {
            const params = {
                where: {_id: _req.body.id},
                set: {file_path: destPath}
            };
            const poster = await _this.PosterRepository.update(params);
            return poster;
        });
        src.on('error', function(err) { throw new Error('An error occurred copying the image'); });
    }    


    async getPoster(res) {
        const poster = await this.PosterRepository.find({user: res.res.userData.userId});

        return poster;
    }

    async getPosterById(req) {
        const { id } = req.params;
        const poster = await this.PosterRepository.findOne({_id: id});

        return poster;
    }

    async getPosterByUserId(req) {
        const { id } = req.params;
        const poster = await this.PosterRepository.findOne({user: id});

        return poster;
    }

    async update(req, res) {
        let { id } = req.params;
        const params = {
            where: {_id: id},
            set: req.body
        };
        const poster = await this.PosterRepository.update(params);
        global.io.emit('action', 'ALGOOOOOOOOOOOOOOOOOO');

        return poster;
    }

    async remove(req) {
        let { id } = req.params;
        const poster = await this.PosterRepository.remove({_id: id});

        return poster;
    }
}

module.exports = posterService;