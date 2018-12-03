import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ApplicationMenuLayout from 'terra-application-menu-layout';
import { ApplicationMenuName } from 'terra-application-name';
import { ApplicationMenuUtility } from 'terra-application-utility';
import { disclosureType as modalDisclosureType } from 'terra-modal-manager';
import { withDisclosureManager, disclosureManagerShape } from 'terra-disclosure-manager';

import 'terra-base/lib/baseStyles';
import ApplicationLayoutPropTypes from '../utils/propTypes';

import UtilityMenuWrapper from './_UtilityMenuWrapper';

import styles from './ApplicationMenu.module.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The element to be placed within the fill flex styled content area.
   * This content is intended to be the user configured content for the menu.
   */
  content: PropTypes.element,
  /**
   * The element to be placed within the fit top area for extensions within the layout.
   */
  extensions: PropTypes.element,
  /**
   * Configuration values for the ApplicationName component.
   */
  nameConfig: ApplicationLayoutPropTypes.nameConfigPropType,
  /**
   * Configuration to be provided to the ApplicationUtility component.
   */
  utilityConfig: ApplicationLayoutPropTypes.utilityConfigPropType,
  /**
   * DisclosureManagerDelegate instance automatically provided by a DisclosureManagerProvider.
   */
  disclosureManager: disclosureManagerShape,
};

class ApplicationMenu extends React.Component {
  constructor(props) {
    super(props);

    this.renderHeader = this.renderHeader.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.handleUtilityDiscloseRequest = this.handleUtilityDiscloseRequest.bind(this);
    this.handleUtilityOnChange = this.handleUtilityOnChange.bind(this);
  }

  handleUtilityDiscloseRequest(utilityMenu) {
    const { disclosureManager } = this.props;

    if (disclosureManager && utilityMenu) {
      disclosureManager.disclose({
        preferredType: modalDisclosureType,
        dimensions: { height: '420', width: '320' },
        content: {
          component: <UtilityMenuWrapper>{utilityMenu}</UtilityMenuWrapper>,
          key: 'application-menu-utility-menu',
        },
      });
    }
  }

  handleUtilityOnChange(event, itemData) {
    const { utilityConfig, disclosureManager } = this.props;

    utilityConfig.onChange(event, itemData, disclosureManager && disclosureManager.disclose);
  }

  renderHeader() {
    const { nameConfig } = this.props;

    if (nameConfig && (nameConfig.accessory || nameConfig.title)) {
      return (
        <div className={cx(['menu-header'])}>
          <ApplicationMenuName accessory={nameConfig.accessory} title={nameConfig.title} />
        </div>
      );
    }

    return null;
  }

  renderFooter() {
    const { utilityConfig } = this.props;

    if (utilityConfig) {
      return (
        <ApplicationMenuUtility
          onChange={this.handleUtilityOnChange}
          onDisclose={this.handleUtilityDiscloseRequest}
          title={utilityConfig.title}
          accessory={utilityConfig.accessory}
          menuItems={utilityConfig.menuItems}
          initialSelectedKey={utilityConfig.initialSelectedKey}
          data-application-menu-utility
        />
      );
    }

    return null;
  }

  render() {
    const {
      content,
      extensions,
    } = this.props;


    return (
      <div className={cx('application-menu')}>
        <ApplicationMenuLayout
          header={this.renderHeader()}
          extensions={extensions}
          content={content}
          footer={this.renderFooter()}
        />
      </div>
    );
  }
}

ApplicationMenu.propTypes = propTypes;

export default withDisclosureManager(ApplicationMenu);
