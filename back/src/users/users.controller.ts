import {
  Controller,
  Get,
  Patch,
  Param,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CloudinaryService } from './cloudinary.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../common/roles.enum';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @ApiQuery({
    name: 'page',
    required: false,
    type: String,
    description: 'Número de página',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: String,
    description: 'Número de usuarios por página',
  })
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getAllUsers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): any {
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;

    const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 5;

    return this.usersService.getAllUsers(validPage, validLimit);
  }

  @ApiBearerAuth('access-token')
  @Get('search/email')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUserByEmail(@Query('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @ApiBearerAuth('access-token')
  @Get('country')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsersByCountry(
    @Query('country') country: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): any {
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;

    const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 5;

    return this.usersService.getUserByCountry(country, validPage, validLimit);
  }

  @ApiBearerAuth('access-token')
  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @Patch(':id/admin')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  makeUserAdmin(@Param('id') id: string) {
    return this.usersService.makeUserAdmin(id);
  }

  @Patch(':id/deactivate')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  deactivateUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deactivateUser(id);
  }

  @Patch(':id/activate')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  activateUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.activateUser(id);
  }
}
