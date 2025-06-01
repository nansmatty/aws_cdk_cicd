import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { PipelineStage } from './PipelineStageStack';

//adding comment to redeploy the project 1st commit failed and also the npm run build command because the build pipeline failed because of build

export class CdkCicdStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const pipeline = new CodePipeline(this, 'AwesomePipeline', {
			pipelineName: 'AwesomePipeline',
			synth: new ShellStep('Synth', {
				input: CodePipelineSource.gitHub('nansmatty/aws_cdk_cicd', 'main'),
				commands: ['npm ci', 'npm run build', 'npx cdk synth'],
			}),
		});

		const testStage = pipeline.addStage(
			new PipelineStage(this, 'PipelineTestStage', {
				stageName: 'test',
			})
		);
	}
}
