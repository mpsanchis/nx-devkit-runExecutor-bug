import { 
    ExecutorContext, 
    logger,
    runExecutor,
    parseTargetString
} from '@nx/devkit';
import { BuildMeExecutorOptions } from './schema';

export default async function buildMe(
    options: BuildMeExecutorOptions,
    context: ExecutorContext
  ) {

    const buildTarget = {
      name: `${context.projectName}:build`,
    };

    if (!context.projectGraph) {
        throw new Error('context.projectGraph is undefined');
      }

    const targetDescription = parseTargetString(
        buildTarget.name,
        context.projectGraph
      );

    const buildResult = await runExecutor(targetDescription, {}, context);
  
    for await (const output of buildResult) {
    if (!output.success) {
        throw new Error(`buildMe couldn't build the library`);
    }
    }
    
    logger.info('builder lib did its job: just delegate to default build target')
  
    return {
      success: true,
    };
  }