import { Injectable, NestMiddleware } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { Repository } from 'typeorm'
import { User } from '../entities/user/users.entity'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authorization = req.get('authorization')

    if (
      !(
        authorization &&
        authorization.includes('Bearer ') &&
        typeof authorization === 'string'
      )
    ) {
      return next()
    }

    const token = authorization.split(' ')[1]

    if (!token) {
      return next()
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload

    const user = await this.user.findOne({ where: { id: decoded.id } })

    req.user = user
    next()
  }
}
