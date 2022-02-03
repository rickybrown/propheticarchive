import React from 'react';
import _ from 'lodash';

import { Link, withPrefix } from '../utils';
import ShowcaseItem from './ShowcaseItem';

export default class ShowcaseSection extends React.Component {
    renderProject(project, index, projectCount, viewAllLabel, viewAllUrl) {
        if ((index === projectCount - 1) && viewAllLabel && viewAllUrl) {
            const thumbImage = _.get(project, 'thumb_image');
            const thumbImageAlt = _.get(project, 'thumb_image_alt', '');

            return (
                <article key={index} className="cell project-card">
                    <Link href={withPrefix(viewAllUrl)} className="project-card__view-all">
                        {thumbImage && (
                            <div className="project-card__image">
                                <img src={withPrefix(thumbImage)} alt={thumbImageAlt} />
                            </div>
                        )}
                        <span className="project-card__button">{viewAllLabel}</span>
                    </Link>
                </article>
            );
        } else {
            return (
                <ShowcaseItem key={index} project={project} />
            );
        }
    }

    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id');
        const title = _.get(section, 'title');
        const subtitle = _.get(section, 'subtitle');
        const layoutStyle = _.get(section, 'layout_style', 'mosaic');
        const viewAllLabel = _.get(section, 'view_all_label');
        const viewAllUrl = _.get(section, 'view_all_url');
        const projects = _.orderBy(_.get(this.props, 'projects', []), 'date', 'desc');
        const projectCount = _.size(projects);

        return (
            <section id={sectionId} className="section section--showcase">
                <div className="container container--lg">
                    {title && <h2 className="section__title line-top">{title}</h2>}
                    {subtitle && <p className="section__subtitle">{subtitle}</p>}
                    <div className={`grid showcase-feed showcase-feed--${layoutStyle}`}>
                        {_.map(projects, (project, index) => this.renderProject(project, index, projectCount, viewAllLabel, viewAllUrl))}
                    </div>
                </div>
            </section>
        );
    }
}
