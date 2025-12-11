import {
    Controller,
    Post,
    Get,
    Delete,
    Param,
    UseInterceptors,
    UploadedFile,
    Body,
    UseGuards,
    Patch,
    BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductImagesService } from './product-images.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Multer } from 'multer';
import { Express } from 'express'

@ApiTags('Product Images')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('product-images')
export class ProductImagesController {
    constructor(private readonly service: ProductImagesService) { }

    @Post('upload')
    @Roles(Role.ADMIN)
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    cb(null, `product-${uniqueSuffix}${ext}`);
                },
            }),
            fileFilter: (req, file, cb) => {
                if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
                    return cb(new BadRequestException('Only image files are allowed!'), false);
                }
                cb(null, true);
            },
            limits: {
                fileSize: 5 * 1024 * 1024,
            },
        }),
    )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
                productId: {
                    type: 'number',
                },
                isPrimary: {
                    type: 'boolean',
                },
            },
        },
    })
    async uploadImage(
        @UploadedFile() file: Multer.File,
        @Body('productId') productId: string,
        @Body('isPrimary') isPrimary: string,
    ) {
        if (!file) {
            throw new BadRequestException('File is required');
        }

        return this.service.upload(
            +productId,
            file.filename,
            isPrimary === 'true',
        );
    }

    @Get('product/:productId')
    findByProduct(@Param('productId') productId: string) {
        return this.service.findByProduct(+productId);
    }

    @Patch(':id/set-primary')
    @Roles(Role.ADMIN)
    setPrimary(@Param('id') id: string) {
        return this.service.setPrimary(+id);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    remove(@Param('id') id: string) {
        return this.service.remove(+id);
    }
}