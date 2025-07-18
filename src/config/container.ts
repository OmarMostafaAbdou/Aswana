import { container } from 'tsyringe';
import { CategoryRepository, ICategoryRepository } from '../modules/category/Repository/Category.repository';


container.register<ICategoryRepository>("CategoryRepository", CategoryRepository);


export default container; 
