/* global CMS, createClass */
CMS.registerPreviewStyle('/assets/styles/report.css');

const IssuePreview = createClass({
	render() {
		const entry = this.props.entry;
		return (
			<article className='issue'>
				<h3 data-issue='Issue' className='issue-title'>
					{entry.getIn(['data', 'title'])}
				</h3>
				{this.props.widgetFor('body')}
				<div className='issue-meta'>
					<dl>
						<div>
							<dt>WCAG Criteria: </dt>
							<dd>{entry.getIn(['data', 'sc'])}</dd>
						</div>
						{entry.getIn(['data', 'severity']) === 'High' ? (
							<div>
								<dt>Severity: </dt>
								<dd>{entry.getIn(['data', 'severity'])}</dd>
							</div>
						) : (
							''
						)}
						<div>
							<dt>Sample: </dt>
							<dd>{entry.getIn(['data', 'sample'])}</dd>
						</div>
					</dl>
				</div>
			</article>
		);
	},
});

CMS.registerPreviewTemplate('issue', IssuePreview);
